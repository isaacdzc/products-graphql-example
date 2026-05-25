import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    @Query(() => [Product], { name: 'getProducts' })
    async getProducts() {
        return this.productService.getProducts();
    }

    @Mutation(() => Product, { name: 'createProduct' })
    async createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ) {
        return this.productService.createProduct(createProductInput);
    }

    @Query(() => Product, { name: 'product' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.productService.findOne(id);
    }

    @Mutation(() => Product)
    updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
        return this.productService.update(updateProductInput.id, updateProductInput);
    }

    @Mutation(() => Product)
    removeProduct(@Args('id', { type: () => ID }) id: string) {
        return this.productService.remove(id);
    }
}