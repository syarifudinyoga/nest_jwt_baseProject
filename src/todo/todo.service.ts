import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { omit } from 'lodash';

@Injectable()
export class TodoService {
  constructor(private dbService: PrismaService) {}

  /**
   * Get All User
   * @returns
   */
  async getAllTodo() {
    const todos = await this.dbService.todos.findMany();

    if (!todos) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return todos;
  }

  /**
   * Create Todo
   * @param dto
   * @returns
   */
  async createTodo(dto: any) {
    const createTodo = await this.dbService.todos.create({
      data: dto,
    });
    if (createTodo) {
      return {
        statusCode: 200,
        data: dto,
        message: 'Create todos data success',
      };
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
