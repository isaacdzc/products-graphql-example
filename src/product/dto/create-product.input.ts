import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    price!: string;

}