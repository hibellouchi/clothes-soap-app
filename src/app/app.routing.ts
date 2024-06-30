import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },
    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/modules/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'customer',
                loadChildren: () =>
                    import('app/modules/customer/customer.module').then(
                        (m) => m.CustomerModule
                    ),
            },
            {
                path: 'employee',
                loadChildren: () =>
                    import('app/modules/employee/employee.module').then(
                        (m) => m.EmployeeModule
                    ),
            },
            {
                path: 'charge',
                loadChildren: () =>
                    import('app/modules/charge/charge.module').then(
                        (m) => m.ChargeModule
                    ),
            },
            {
                path: 'category-clothe',
                loadChildren: () =>
                    import(
                        'app/modules/categoryClothe/categoryClothe.module'
                    ).then((m) => m.CategoryClotheModule),
            },
            {
                path: 'order',
                loadChildren: () =>
                    import('app/modules/order/order.module').then(
                        (m) => m.OrderModule
                    ),
            },
            {
                path: 'error',
                loadChildren: () =>
                    import('app/modules/error/error.module').then(
                        (m) => m.ErrorModule
                    ),
            },
        ],
    },
    // Default error
    {
        path: '**',
        redirectTo: 'error',
    },
];
