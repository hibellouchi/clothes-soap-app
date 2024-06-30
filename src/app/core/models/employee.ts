export interface NewEmployee {
    name: string;
    phone: string;
    cin: string;
    adress: string;
}
export interface EditEmployee {
    name?: string;
    phone?: string;
    cin?: string;
    adress?: string;
}
export interface Employee {
    _id: string;
    name: string;
    phone: string;
    cin: string;
    adress: string;
    createdAt?: Date;
}
