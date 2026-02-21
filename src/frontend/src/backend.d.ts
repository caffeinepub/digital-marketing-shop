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
    downloadLinks: Array<string>;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    downloadUrl: string;
    imageUrl: string;
    frequentlyBoughtTogether: Array<bigint>;
    category: Category;
    isMegaBundle: boolean;
    price: number;
    videoPreviewUrl?: string;
}
export enum Category {
    viralReelsLibrary = "viralReelsLibrary",
    editingSuite = "editingSuite",
    masterclassCourses = "masterclassCourses",
    softwareTools = "softwareTools"
}
export interface backendInterface {
    addOrder(item: CartItem, customerInfo: string): Promise<Order>;
    addProduct(name: string, description: string, price: number, category: Category, imageUrl: string, videoPreviewUrl: string | null, downloadUrl: string, isMegaBundle: boolean, frequentlyBoughtTogether: Array<bigint>): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    checkout(customerInfo: string): Promise<Order | null>;
    getFrequentlyBoughtTogether(productId: bigint): Promise<Array<Product>>;
    getMegaBundleProduct(): Promise<Product | null>;
    getOrderDownloadLinks(orderId: bigint): Promise<Array<string>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
}
