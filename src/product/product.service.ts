import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async getProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async createProduct(createProductInput: CreateProductInput): Promise<Product> {
        const newProduct = new this.productModel(createProductInput);
        return newProduct.save();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException('Product ' + id + ' not found');
        }
        return product;
    }

    async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
        const existingProduct = await this.productModel
            .findByIdAndUpdate(id, updateProductInput, { new: true })
            .exec();

        if (!existingProduct) {
            throw new NotFoundException('Product ' + id + ' not found');
        }
        return existingProduct;
    }

    async remove(id: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
        if (!deletedProduct) {
            throw new NotFoundException('Product ' + id + ' not found');
        }
        return deletedProduct;
    }
}
