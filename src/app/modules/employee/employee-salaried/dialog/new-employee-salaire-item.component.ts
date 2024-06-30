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
import { EmployeeSalaireApiService } from 'app/core/api/employeeSalaire.service';
import { Employee } from 'app/core/models/employee';
import { GlobalData } from 'app/core/models/global';

import { EMPTY, Observable, catchError, map, startWith, tap } from 'rxjs';

export interface User {
    name: string;
}

@Component({
    selector: 'app-new-employee-salaire-item-dialog',
    templateUrl: './new-employee-salaire-item.component.html',
})
export class NewEmployeeSalaireItemDialogComponent implements OnInit {
    public errorMessage: string | null;
    public isLoading = false;
    public employeeSalaireForm: FormGroup;
    public employee$: Observable<Employee[]>;

    constructor(
        public dialogRef: MatDialogRef<NewEmployeeSalaireItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _employeeApiService: EmployeeApiService,
        private _employeeSalaireApiService: EmployeeSalaireApiService
    ) {
        this.employeeSalaireForm = this._fb.group({
            employee: [data.employee, [Validators.required]],
            salaire: [data.salaire, [Validators.required]],
        });
        this.employee$ = this._employeeApiService
            .getEmployee({ keyword: '' })
            .pipe(
                map((res: GlobalData<Employee>) => res?.data),
                catchError((err) => {
                    return EMPTY;
                })
            );
    }

    ngOnInit() {}

    saveEmployeeSalaire() {
        if (this.employeeSalaireForm.invalid) {
            this._snackBar.open('Please fill all required data.', 'cancel', {
                duration: 3500,
            });
            return;
        }
        if (this.data._id) {
            this._employeeSalaireApiService
                .editEmployeeSalaire(
                    this.data._id,
                    this.employeeSalaireForm.value
                )
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
        this._employeeSalaireApiService
            .addEmployeeSalaire(this.employeeSalaireForm.value)
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
