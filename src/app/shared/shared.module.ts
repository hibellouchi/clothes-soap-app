import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NumberDirective } from './directives/numbers-only.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

const sharedDirevtives = [NumberDirective];
@NgModule({
    declarations: [...sharedDirevtives],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatSortModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...sharedDirevtives,
    ],
})
export class SharedModule {}
