import {Category} from "./schema/book.schema";
import { IsEmpty, isEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../auth/user.schema";


export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsString()
  readonly author: string

  @IsNotEmpty()
  @IsNumber()
  readonly price: number

  @IsNotEmpty()
  @IsEnum(Category, {message: 'please enter Category'})
  readonly category: Category

  @IsEmpty({ message: 'you cannot pass user id' })
  readonly user: User
}