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
import { ChargeApiService } from 'app/core/api/charge.service';
import { CustomerApiService } from 'app/core/api/customer.service';

import { EMPTY, Observable, catchError, map, startWith, tap } from 'rxjs';

export interface User {
    name: string;
}

@Component({
    selector: 'app-new-charge-item-dialog',
    templateUrl: './new-categoryClothe-item.component.html',
})
export class NewCategoryClotheItemDialogComponent implements OnInit {
    public errorMessage: string | null;
    public isLoading = false;
    public chargeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<NewCategoryClotheItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _categoryClotheApiService: CategoryClotheApiService
    ) {
        this.chargeForm = this._fb.group({
            name: [data.name, [Validators.required]],
            price: [data.price, [Validators.required]],
        });
    }

    ngOnInit() {}

    saveCustemer() {
        if (this.chargeForm.invalid) {
            this._snackBar.open('Please fill all required data.', 'cancel', {
                duration: 3500,
            });
            return;
        }
        if (this.data._id) {
            this._categoryClotheApiService
                .editCategoryClothe(this.data._id, this.chargeForm.value)
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
        this._categoryClotheApiService
            .addCategoryClothe(this.chargeForm.value)
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
