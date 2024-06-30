export interface NewEmployeeSalaire{
    employee: string;
    salaire: string;
}
export interface EditEmployeeSalaire{
    employee?: string;
    salaire?: string;
}
export interface EmployeeSalaire{
    _id: string;
    employee: string;
    salaire: string;
    createdAt?: Date;
}
