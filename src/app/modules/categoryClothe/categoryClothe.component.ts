import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ChargeApiService } from 'app/core/api/charge.service';
import { EmployeeApiService } from 'app/core/api/employee.service';
import { Charge } from 'app/core/models/charge';
import { GlobalData } from 'app/core/models/global';
import {
    EMPTY,
    Subject,
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    merge,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';
import { NewCategoryClotheItemDialogComponent } from './dialog/new-categoryClothe-item.component';
import { CategoryClotheApiService } from 'app/core/api/categoryClothe.service';
import { CategoryClothe } from 'app/core/models/categoryClothe';

@Component({
    selector: 'app-categoryClothe',
    templateUrl: './categoryClothe.component.html',
    animations: fuseAnimations,
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
})
export class CategoryClotheComponent {
    private _unsubscibe$ = new Subject();
    private _getData$ = new Subject();
    displayedColumns = ['name', 'price', 'createdAt', 'action'];
    public isLoading = false;
    public isError = false;
    public searchInputControl = new FormControl('');
    public dataSource: GlobalData<CategoryClothe> = {
        data: [],
        count: 0,
    };
    /**
     * Constructor
     */
    constructor(
        private _categoryClotheApiService: CategoryClotheApiService,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit(): void {
        merge(
            this._getData$,
            this.paginator.page,

            this.searchInputControl.valueChanges.pipe(
                takeUntil(this._unsubscibe$),
                debounceTime(800),
                distinctUntilChanged(),
                tap(() => {
                    this.isLoading = true;
                    this.isError = false;
                })
            )
        )
            .pipe(
                switchMap(() =>
                    this._categoryClotheApiService
                        .getCategoryClothe({
                            limit: this.paginator.pageSize,
                            skip:
                                this.paginator.pageSize *
                                this.paginator.pageIndex,
                            sort: '-updatedAt',
                            keyword: this.searchInputControl.value,
                        })
                        .pipe(
                            tap((res: GlobalData<CategoryClothe>) => {
                                this.dataSource.count = res.count;
                                this.dataSource.data = res.data;

                                this.isLoading = false;
                            }),

                            catchError((err) => {
                                this.isLoading = false;
                                this.isError = true;
                                return EMPTY;
                            })
                        )
                )
            )
            .subscribe();
        this._getData$.next({});
    }
    createCategoryClothe() {
        const dialogRef = this.dialog.open(
            NewCategoryClotheItemDialogComponent,
            {
                width: '50vw',
                data: '',
            }
        );

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed', result);
            this.isLoading = true;
            this._getData$.next({});
        });
    }
    editCategoryClothe(row) {
        const dialogRef = this.dialog.open(
            NewCategoryClotheItemDialogComponent,
            {
                width: '50vw',
                data: row,
            }
        );

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed', result);
            this.isLoading = true;
            this._getData$.next({});
        });
    }
    deleteCategoryClothe(row) {
        this._fuseConfirmationService
            .open({
                title: 'Delete Category Clothe',
                message: 'Do you want to Delete this Category Clothe ?',
            })
            .afterClosed()
            .pipe(
                takeUntil(this._unsubscibe$),
                filter((f) => f == 'confirmed'),

                switchMap(() =>
                    this._categoryClotheApiService
                        .deleteCategoryClothe(row._id, {})
                        .pipe(
                            catchError((err) => {
                                this.isError = true;
                                return EMPTY;
                            }),
                            tap(() => {
                                this._getData$.next({});
                            })
                        )
                )
            )
            .subscribe();
    }
}
