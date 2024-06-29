import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { errorRoutes } from './error.routing';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [ErrorComponent],
    imports: [
        RouterModule.forChild(errorRoutes),
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
    ],
})
export class ErrorModule {}
