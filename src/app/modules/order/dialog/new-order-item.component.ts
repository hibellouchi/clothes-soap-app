import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryClotheApiService } from 'app/core/api/categoryClothe.service';
import { CustomerApiService } from 'app/core/api/customer.service';
import { EmployeeApiService } from 'app/core/api/employee.service';
import { EmployeeSalaireApiService } from 'app/core/api/employeeSalaire.service';
import { OrderApiService } from 'app/core/api/order.service';
import { CategoryClothe } from 'app/core/models/categoryClothe';
import { Customer } from 'app/core/models/customer';
import { Employee } from 'app/core/models/employee';
import { GlobalData } from 'app/core/models/global';

import { EMPTY, Observable, catchError, map, startWith, tap } from 'rxjs';

export interface User {
    name: string;
}

@Component({
    selector: 'app-new-order-item-dialog',
    templateUrl: './new-order-item.component.html',
})
export class NewOrderItemDialogComponent implements OnInit {
    public errorMessage: string | null;
    public isLoading = false;
    public orderForm: FormGroup;
    public customer$: Observable<Customer[]>;
    public categoryClothe$: Observable<CategoryClothe[]>;
    public status = ['No Paid', 'Paid'];
    selectedCategoryClothe: CategoryClothe;

    constructor(
        public dialogRef: MatDialogRef<NewOrderItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _customerApiService: CustomerApiService,
        private _categoryClotheApiService: CategoryClotheApiService,
        private _orderApiService: OrderApiService
    ) {
        this.orderForm = this._fb.group({
            customer: [data.customer, [Validators.required]],
            categoryClothe: [data.categoryClothe, [Validators.required]],
            quantity: [data.quantity, [Validators.required]],
            price: [data.price, [Validators.required]],
            status: [data.status, [Validators.required]],
        });

        this.customer$ = this._customerApiService
            .getCustomer({ keyword: '' })
            .pipe(
                map((res: GlobalData<Customer>) => res?.data),
                catchError((err) => {
                    return EMPTY;
                })
            );

        this.categoryClothe$ = this._categoryClotheApiService
            .getCategoryClothe({ keyword: '' })
            .pipe(
                map((res: GlobalData<CategoryClothe>) => res?.data),
                catchError((err) => {
                    return EMPTY;
                })
            );
    }

    ngOnInit() {
        this.categoryClothe$.subscribe((categoryClothe: CategoryClothe[]) => {
            this.orderForm.controls.categoryClothe.valueChanges
                .pipe(
                    tap((res: string) => {
                        this.selectedCategoryClothe = categoryClothe.find(
                            (caty) => caty.name === res
                        );

                        this.orderForm.controls.price.setValue(
                            this.selectedCategoryClothe.price
                        );
                    })
                )
                .subscribe();
        });
    }

    saveEmployeeSalaire() {
        if (this.orderForm.invalid) {
            this._snackBar.open('Please fill all required data.', 'cancel', {
                duration: 3500,
            });
            return;
        }
        if (this.data._id) {
            this._orderApiService
                .editOrder(this.data._id, this.orderForm.value)
                .pipe(
                    catchError((err) => {
                        this.errorMessage = err?.error?.message;
                        return EMPTY;
                    }),
                    tap(() => {
                        this.dialogRef.close(true);
                    })
                )
                .subscribe();
            return;
        }

        this.errorMessage = null;
        this._orderApiService
            .addOrder(this.orderForm.value)
            .pipe(
                catchError((err) => {
                    this.errorMessage = err?.error?.message;
                    return EMPTY;
                }),
                tap(() => {
                    this.dialogRef.close(true);
                })
            )
            .subscribe();
    }
}
