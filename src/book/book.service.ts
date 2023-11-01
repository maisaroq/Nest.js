import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { Book} from "./schema/book.schema";
import * as mongoose from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Query} from 'express-serve-static-core';
import { User } from "../auth/user.schema";

//we need to inject our module and get data from db for that we use the constructor

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book> //create a bookModel variable

  ) {}

  async findAll(query: Query): Promise<Book[]> {

    const resPerPage = 2
    const currentPage = Number(query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    const keyword = query.keyword ? {
      title: {
        $regex: query.keyword,
        $options: 'i'
      }
    } : {}
    const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
    return books
  }

  async create(book: Book, user: User): Promise<Book> {

    const data = Object.assign(book, {user: user._id})
    const res = await this.bookModel.create(book)
    return res

  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id)

    const isValid = mongoose.isValidObjectId(id)

    if (!isValid) {
      throw new BadRequestException('please enter valid Id')
    }
    if (!book){
      throw new NotFoundException('Book is not found')
    }
    return book

  }

  async updateById(id: string, book: Book): Promise<Book> {
    await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidator: true
    })
    if (!book){
      throw new NotFoundException('Book is not found')
    }
    return book

  }
}
