import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Product extends Document {

    @Field(() => ID)
    id!: string;

    @Field()
    @Prop({ required: true })
    name!: string;

    @Field()
    @Prop({ required: true })
    description!: string;

    @Field()
    @Prop({ required: true })
    price!: number;

    @Field(() => Date)
    createdAt!: Date;

    @Field(() => Date)
    updatedAt!: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);