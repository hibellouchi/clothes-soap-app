export interface NewCustomer {
    name: string;
    phone: string;
}
export interface EditCustomer {
    name?: string;
    phone?: string;
}
export interface Customer {
    _id: string;
    name: string;
    phone: string;
    createdAt?: Date;
}
