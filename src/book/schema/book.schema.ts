import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

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
}

// in order to export book schema

export const BookSchema = SchemaFactory.createForClass(Book)


