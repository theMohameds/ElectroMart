import { Product } from "./Product";
import { ProductType } from "./ProductType";

export class Phone extends Product {
  public productType: ProductType = ProductType.Phone;
}