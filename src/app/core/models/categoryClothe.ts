export interface NewCategoryClothe {
    name: string;
    price: string;
}
export interface EditCategoryClothe {
    name?: string;
    price?: string;
}
export interface CategoryClothe {
    _id: string;
    name: string;
    price: string;
    createdAt?: Date;
}
