import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerApiService } from 'app/core/api/customer.service';

import { EMPTY, Observable, catchError, map, startWith, tap } from 'rxjs';

export interface User {
    name: string;
}

@Component({
    selector: 'app-new-customer-item-dialog',
    templateUrl: './new-customer-item.component.html',
})
export class NewCustomerItemDialogComponent implements OnInit {
    public errorMessage: string | null;
    public isLoading = false;
    public customerForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<NewCustomerItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _customerApiService: CustomerApiService
    ) {
        this.customerForm = this._fb.group({
            name: [data.name, [Validators.required]],
            phone: [data.phone, [Validators.required]],
        });
    }

    ngOnInit() {}

    saveCustemer() {
        if (this.customerForm.invalid) {
            this._snackBar.open('Please fill all required data.', 'cancel', {
                duration: 3500,
            });
            return;
        }
        if (this.data._id) {
            this._customerApiService
                .editCustomer(this.data._id, this.customerForm.value)
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
        this._customerApiService
            .addCustomer(this.customerForm.value)
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
