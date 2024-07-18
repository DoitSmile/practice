import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductSalseslocationInput } from 'src/apis/productSaleslocation/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => ProductSalseslocationInput)
  productSaleslocation: ProductSalseslocationInput;
}
