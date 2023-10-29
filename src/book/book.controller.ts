import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import {BookService} from "./book.service";
import {Book} from "./schema/book.schema";
import {CreateBookDto} from "./create-book.dto";
import {UpdateBookDto} from "./update-book.dto";
import {Query as ExpressQuery} from 'express-serve-static-core'

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query)
  }

  @Post()
  async createBook(@Body() book: CreateBookDto,): Promise<Book> {
    return this.bookService.create(book)
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id)
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book> {
    return this.bookService.updateById(id, book)
  }
}
