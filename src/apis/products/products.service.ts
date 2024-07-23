import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IProducsServicetDelete,
  IProductServiceCreate,
  IProductServiceFindOne,
  IProductServiceUpdate,
  IProductsServiceCheckSoldout,
} from './interfaces/products.interface';
import { ProductsSaleslocationsService } from '../productSaleslocation/productSaleslocationService/productsSaleslocationsService';

@Injectable()
export class ProductsService {
  constructor(
    // 데이터베이스에 저장하기 위해 db와 연결해주는 부분 주입
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //Repository == db
    private readonly productsSaleslocationService: ProductsSaleslocationsService,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
    });
  }

  async create({
    createProductInput,
  }: IProductServiceCreate): Promise<Product> {
    // 상품과 거래 위치를 같이 등록하는 경우
    const { productSaleslocation, ...product } = createProductInput;

    const result = await this.productsSaleslocationService.create({
      ...productSaleslocation,
    });

    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result,
    });

    return result2;
  }

  async update({
    productId,
    updateProductsInput,
  }: IProductServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });
    this.checkSoldOut({ product });
    const result = this.productsRepository.save({
      ...product, // 수정후 수정되지않은 다른 값까지 불러오고싶을 때 사용 .save : 저장되는 객체 자체를 반환
      ...updateProductsInput,
    });

    // update({ productId, updateProductInput }){ // update: 데이터를 수정할 때 사용
    //   this.productRepository.update(
    //   { id: productId  }, // 무엇에 대해서
    //   { ...updateProductInput } // 무엇을 수정 할 것인지
    //   )
    //   return "수정이 완료되었습니다."
    // }
    return result;
  }

  checkSoldOut({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('판매 완료된 제품입니다.');
    }
  }

  // 논리 삭제 (soft delete)
  async delete({ productId }: IProducsServicetDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false; // 삭제가 이루어진 것이 있으면 true를, 없으면 false를 반환
  }
}
