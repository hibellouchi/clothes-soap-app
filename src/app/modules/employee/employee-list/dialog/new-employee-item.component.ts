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
import { EmployeeApiService } from 'app/core/api/employee.service';

import { EMPTY, Observable, catchError, map, startWith, tap } from 'rxjs';

export interface User {
    name: string;
}

@Component({
    selector: 'app-new-employee-item-dialog',
    templateUrl: './new-employee-item.component.html',
})
export class NewEmlpoyeeItemDialogComponent implements OnInit {
    public errorMessage: string | null;
    public isLoading = false;
    public employeeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<NewEmlpoyeeItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _employeeApiService: EmployeeApiService
    ) {
        this.employeeForm = this._fb.group({
            name: [data.name, [Validators.required]],
            phone: [data.phone, [Validators.required]],
            cin: [data.cin, [Validators.required]],
            adress: [data.adress, [Validators.required]],
        });
    }

    ngOnInit() {}

    saveEmployee() {
        if (this.employeeForm.invalid) {
            this._snackBar.open('Please fill all required data.', 'cancel', {
                duration: 3500,
            });
            return;
        }
        if (this.data._id) {
            this._employeeApiService
                .editEmployee(this.data._id, this.employeeForm.value)
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
        this._employeeApiService
            .addEmployee(this.employeeForm.value)
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
