import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      formatError: (error: any) => {
        const originalError = error.extensions?.originalError as any;
        const validationMessages = originalError?.message;
        const formattedMessage = Array.isArray(validationMessages)
          ? `Validation failed: ${validationMessages.join(', ')}`
          : originalError?.message || error.message;
        return {
          message: formattedMessage,
          code: originalError?.error?.toUpperCase().replace(' ', '_') || error.extensions?.code || 'BAD_REQUEST',
          status: originalError?.statusCode || error.extensions?.status || 400,
          path: error.path,
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('DB_USER');
        const password = configService.get<string>('DB_PASSWORD');
        const cluster = configService.get<string>('DB_CLUSTER');
        const dbName = configService.get<string>('DB_NAME');

        return {
          uri: `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`,
        };
      },
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
