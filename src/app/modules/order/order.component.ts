import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { OrderApiService } from 'app/core/api/order.service';
import { GlobalData } from 'app/core/models/global';
import { Order } from 'app/core/models/order';
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
import { NewOrderItemDialogComponent } from './dialog/new-order-item.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
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
export class OrderComponent {
    private _unsubscibe$ = new Subject();
    private _getData$ = new Subject();
    displayedColumns = [
        'customer',
        'categoryClothe',
        'quantity',
        'price',
        'total',
        'status',
        'createdAt',
        'action',
    ];
    public isLoading = false;
    public isError = false;
    public searchInputControl = new FormControl('');
    public dataSource: GlobalData<Order> = {
        data: [],
        count: 0,
    };
    /**
     * Constructor
     */
    constructor(
        private _orderApiService: OrderApiService,
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
                    this._orderApiService
                        .getOrder({
                            limit: this.paginator.pageSize,
                            skip:
                                this.paginator.pageSize *
                                this.paginator.pageIndex,
                            sort: '-updatedAt',
                            keyword: this.searchInputControl.value,
                        })
                        .pipe(
                            tap((res: GlobalData<Order>) => {
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

    createOrder() {
        const dialogRef = this.dialog.open(NewOrderItemDialogComponent, {
            width: '50vw',
            data: '',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed', result);
            this.isLoading = true;
            this._getData$.next({});
        });
    }

    editOrder(row) {
        const dialogRef = this.dialog.open(NewOrderItemDialogComponent, {
            width: '50vw',
            data: row,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed', result);
            this.isLoading = true;
            this._getData$.next({});
        });
    }
    setStatus(row) {
        this._orderApiService
            .editStatusOrder(row._id, { status: 'Paid' })
            .pipe(
                catchError((err) => {
                    this.isError = true;
                    return EMPTY;
                }),
                tap(() => {
                    this._getData$.next({});
                })
            )
            .subscribe();
    }
    getStatusColor(status: string): string {
        switch (status) {
            case 'No Paid':
                return 'orange';
            case 'Paid':
                return 'green';
            case 'Canceled':
                return 'red';
        }
    }
    deleteOrder(row) {
        this._fuseConfirmationService
            .open({
                title: 'Delete Facture',
                message: 'Do you want to Delete this Facture ?',
            })
            .afterClosed()
            .pipe(
                takeUntil(this._unsubscibe$),
                filter((f) => f == 'confirmed'),

                switchMap(() =>
                    this._orderApiService
                        .editStatusOrder(row._id, { status: 'Canceled' })
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

    ngOnDestroy(): void {
        this._unsubscibe$.next({});
        this._unsubscibe$.complete();
    }
}
