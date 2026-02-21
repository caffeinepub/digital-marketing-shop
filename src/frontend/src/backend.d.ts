import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Order {
    id: bigint;
    customerInfo: string;
    status: string;
    total: number;
    items: Array<CartItem>;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    addOrder(item: CartItem, customerInfo: string): Promise<Order>;
    addProduct(name: string, description: string, price: number, category: string, imageUrl: string): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    checkout(customerInfo: string): Promise<Order | null>;
    getProduct(id: bigint): Promise<Product | null>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
}
