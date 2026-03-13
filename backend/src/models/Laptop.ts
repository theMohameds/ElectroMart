import { Product } from "./Product";
import { ProductType } from "./ProductType";

export class Laptop extends Product {
  public productType: ProductType = ProductType.Laptop;
}