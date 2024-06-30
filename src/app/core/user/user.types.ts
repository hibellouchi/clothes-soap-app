export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}
export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
