export interface NewEmployeeSalaire {
    employee: string;
    price: string;
}
export interface EditEmployeeSalaire {
    employee?: string;
    price?: string;
}
export interface EmployeeSalaire {
    _id: string;
    employee: string;
    price: string;
    createdAt?: Date;
}
