import { Field, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // typeorm을 위한
@ObjectType() // 객체 타입의 graphql 설정, return타입 정해주는 것이기도 함
export class Product {
  @PrimaryGeneratedColumn('uuid') // typeorm을 위한
  @Field(() => String) // graphql을 위한,대문자로 시작
  id: string; //타입스크립트 type, 소문자로 시작

  @DeleteDateColumn()
  deletedAt: Date;

  @Column() // typeorm을 위한
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Min(0)
  @Column()
  @Field(() => String)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;
}
