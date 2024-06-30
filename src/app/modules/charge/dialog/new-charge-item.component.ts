import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChargeApiService } from 'app/core/api/charge.service';
import { CustomerApiService } from 'app/core/api/customer.service';

import { EMPTY, Observable, catchError, map, startWith, tap } from 'rxjs';

export interface User {
    name: string;
}

@Component({
    selector: 'app-new-charge-item-dialog',
    templateUrl: './new-charge-item.component.html',
})
export class NewChargeItemDialogComponent implements OnInit {
    public errorMessage: string | null;
    public isLoading = false;
    public chargeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<NewChargeItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _chargeApiService: ChargeApiService
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
            this._chargeApiService
                .editCharge(this.data._id, this.chargeForm.value)
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
        this._chargeApiService
            .addCharge(this.chargeForm.value)
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
