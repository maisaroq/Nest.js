import {Category} from "./schema/book.schema";
import { IsEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { User } from "../auth/user.schema";

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string

  @IsOptional()
  @IsString()
  readonly description: string

  @IsOptional()
  @IsString()
  readonly author: string

  @IsOptional()
  @IsString()
  readonly price: number

  @IsOptional()
  @IsEnum(Category, {message: 'please enter Category'})
  readonly category: Category

  @IsEmpty({ message: 'you cannot pass user id' })
  readonly user: User

}