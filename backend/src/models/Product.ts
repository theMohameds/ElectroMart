import { ProductType } from "./ProductType";
import { config } from "../config";

export abstract class Product {
    public title: string;
    public imageUrl: string;
    public basePrice: number;

    // values sourced from environment variables via config.ts
    public taxRate: number = config.taxRate;
    public discountRate: number = config.discountRate;

    public abstract productType: ProductType;

    constructor(title: string, imageUrl: string, basePrice: number) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.basePrice = basePrice;
    }

    public getPrice(): number {
        return (this.basePrice * (1 - this.discountRate)) * this.taxRate;
    }

    public getPriceWithoutTaxes(): number {
        return this.basePrice * (1 - this.discountRate);
    }
}