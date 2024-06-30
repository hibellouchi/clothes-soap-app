export interface NewCharge {
    name: string;
    price: string;
}
export interface EditCharge {
    name?: string;
    price?: string;
}
export interface Charge {
    _id: string;
    name: string;
    price: string;
    createdAt?: Date;
}
