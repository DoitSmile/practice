import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductsInput } from '../dto/update-product.input';
import { Product } from '../entites/product.entity';

export interface IProductServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductServiceFindOne {
  productId: string;
}

export interface IProductServiceUpdate {
  productId: string;
  updateProductsInput: UpdateProductsInput;
}

export interface IProductsServiceCheckSoldout {
  product: Product;
}

export interface IProducsServicetDelete {
  productId: string;
}
