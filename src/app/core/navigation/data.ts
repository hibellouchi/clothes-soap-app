/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const adminNavigation: FuseNavigationItem[] = [
    {
        id: 'dasboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/dashboard',
    },
    {
        id: 'customer',
        title: 'Customer',
        type: 'basic',
        icon: 'mat_solid:group',
        link: '/customer',
    },
    {
        id: 'employee',
        title: 'Employee',
        type: 'collapsable',
        icon: 'mat_solid:badge',
        link: '/employee',
        children: [
            {
                id: 'employee-list',
                title: 'Employee',
                type: 'basic',
                icon: 'mat_solid:manage_accounts',
                link: '/employee/list',
            },
            {
                id: 'employee-salaried',
                title: 'Salaried',
                type: 'basic',
                icon: 'mat_solid:attach_money',
                link: '/employee/salaire',
            },
        ],
    },
    {
        id: 'charge',
        title: 'Charge',
        type: 'basic',
        icon: 'mat_solid:payments',
        link: '/charge',
    },
];
export const staffNavigation: FuseNavigationItem[] = [
    {
        id: 'dasboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/dashboard',
    },
    {
        id: 'customer',
        title: 'Customer',
        type: 'basic',
        icon: 'mat_solid:group',
        link: '/customer',
    },

    {
        id: 'employee',
        title: 'Employee',
        type: 'collapsable',
        icon: 'mat_solid:badge',
        link: '/employee',
        children: [
            {
                id: 'employee-list',
                title: 'Employee',
                type: 'basic',
                icon: 'mat_solid:manage_accounts',
                link: '/employee/list',
            },
            {
                id: 'employee-salaried',
                title: 'Salaried',
                type: 'basic',
                icon: 'mat_solid:attach_money',
                link: '/employee/salaire',
            },
        ],
    },
    {
        id: 'charge',
        title: 'Charge',
        type: 'basic',
        icon: 'mat_solid:payments',
        link: '/charge',
    },
];
