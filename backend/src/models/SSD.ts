import { Product } from "./Product";
import { ProductType } from "./ProductType";

export class SSD extends Product {
  public productType: ProductType = ProductType.SSD;
}