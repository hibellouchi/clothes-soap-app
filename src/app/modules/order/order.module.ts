import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderComponent } from './order.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { FuseCardModule } from '@fuse/components/card';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MatRippleModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewOrderItemDialogComponent } from './dialog/new-order-item.component';

const orderRoutes: Route[] = [
    {
        path: '',
        component: OrderComponent,
    },
];

@NgModule({
    declarations: [OrderComponent, NewOrderItemDialogComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(orderRoutes),

        MatSortModule,
        MatPaginatorModule,
        MatDividerModule,
        MatTableModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule,
        SharedModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressBarModule,
        NgApexchartsModule,
        TranslocoModule,
        MatTabsModule,
        MatDialogModule,
        MatSnackBarModule,
        FuseCardModule,
        MatRippleModule,
        MatMenuModule,
        MatSidenavModule,
        NgxDaterangepickerMd.forRoot(),
    ],
    providers: [DatePipe],
})
export class OrderModule {}
