interface Product {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export interface GetProductByIdSuccess {
    product: Product;
    event: {};
}

export interface GetProductByIdFailed {
    message: string;
    event: {};
}


export interface GetProductsList {
    products: Product[];
    event: {};
}

export interface CreateProduct {
    title: string;
    description: string;
    price: number;
    count: number;
}

export interface CommonFailed {
    message: string;
    event: {};
}