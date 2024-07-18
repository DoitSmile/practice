import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductsInput extends PartialType(CreateProductInput) {}
//PartialType: 모든 컬럼을 선택으로 만들어줌, update시 모두 수정하는 것이 아니기 때문에 해당 type사용
