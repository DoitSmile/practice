import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSalseslocationInput extends OmitType(
  ProductSaleslocation, // 대상 entity
  ['id'], // 제외할것
  InputType,
) {
  //   name: string; // TypeScript를 위한
  //   description: string;
  //   price: number; ....
}
