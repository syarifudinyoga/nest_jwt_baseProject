import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { omit } from 'lodash';
import { TodoDto } from './dto/todo.dto';

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

  /**
   * Get By ID
   * @returns
   */
  async getById(id: any) {
    const todo = await this.dbService.todos.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  /**
   * Get By ID
   * @returns
   */
  async update(id: any, dto: any) {
    const todo = await this.dbService.todos.update({
      where: { id: Number(id) },
      data: dto,
    });

    if (!todo) {
      throw new HttpException('Bad Request', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  /**
   * Get By ID
   * @returns
   */
  async delete(id: any) {
    const todo = await this.dbService.todos.delete({
      where: { id: Number(id) },
    });

    if (!todo) {
      throw new HttpException('Bad Request', HttpStatus.NOT_FOUND);
    }

    return todo;
  }
}
