import { InputType, Field, Float } from '@nestjs/graphql';
import { MinLength, IsPositive, IsNotEmpty } from 'class-validator'; // Importamos validadores

@InputType()
export class CreateProductInput {
    @Field()
    @IsNotEmpty({ message: 'Name could not be empty' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name!: string;

    @Field()
    @IsNotEmpty()
    description!: string;

    @Field(() => Float)
    @IsPositive({ message: 'Price must be a positive number' })
    price!: number;
}