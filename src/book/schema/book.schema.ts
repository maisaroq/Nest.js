import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { User } from "../../auth/user.schema";
import mongoose from "mongoose";

export enum Category {
  ADVENTURE = "Adventure",
  CLASSIC = "Classic"
}

@Schema({
  timestamps: true,
})

//to create a schema we need a class and add all the fields we need to our schema
export class Book {

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  author: string

  @Prop()
  price: number

  @Prop()
  category: Category

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

// in order to export book schema

export const BookSchema = SchemaFactory.createForClass(Book)


