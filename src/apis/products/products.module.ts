import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entites/product.entity';
import { ProductResolver } from './products.reolver';
import { ProductsService } from './products.service';
import { ProductsSaleslocationsService } from '../productSaleslocation/productSaleslocationService/productsSaleslocationsService';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';

// service와 product를 합쳐주는곳
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSaleslocation])], //TypeOrmModule.forFeature: 엔티티를 전달해줌(데이터베이스 연동)
  providers: [ProductResolver, ProductsService, ProductsSaleslocationsService],
})
export class ProductsModule {}
