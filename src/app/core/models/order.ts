export interface NewOrder {
    custemer: string;
    categoryClothe: string;
    quantity: string;
    price: string;
    status?: string;
    
}
export interface EditOrder {
    custemer?: string;
    categoryClothe?: string;
    quantity?: string;
    price?: string;
    status?: string;
}
export interface Order {
    _id: string;
    custemer: string;
    categoryClothe: string;
    quantity: string;
    price: string;
    status: string;
    createdAt?: Date;
}
