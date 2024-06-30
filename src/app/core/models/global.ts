export interface GlobalData<T> {
    data: T[];
    count: number;
}
export interface GlobalCount {
    count: number;
}
export interface GlobalDataById<T> {
    data: T[];
}
export interface GlobalBody {
    skip?: number;
    limit?: number;
    sort?: string;
    keyword?: string;
}
export interface languageModel {
    label: string;
    key: string;
}
