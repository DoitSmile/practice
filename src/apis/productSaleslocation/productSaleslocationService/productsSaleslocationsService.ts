import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';
import { Repository } from 'typeorm';
import { ProductSalseslocationInput } from '../dto/productSaleslocation.input';

@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ ...productSaleslocation }: ProductSalseslocationInput) {
    return this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
  }
}
