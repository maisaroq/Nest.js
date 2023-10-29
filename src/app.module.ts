import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import {ConfigModule} from "@nestjs/config";
import * as mongoose from "mongoose";
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI!,{
        dbName: process.env.MONGODB_DATABASE_NAME!,
        user: process.env.MONGODB_USER!,
        pass: process.env.MONGODB_PASSWORD!,}
      ),
    BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

