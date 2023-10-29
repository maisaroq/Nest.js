import {Injectable, NotFoundException} from '@nestjs/common';
import { Book} from "./schema/book.schema";
import * as mongoose from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'

//we need to inject our module and get data from db for that we use the constructor

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book> //create a bookModel variable

  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find()
    return books
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book)
    return res

  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id)
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
