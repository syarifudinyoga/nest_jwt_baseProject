import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';

@ApiTags('Todos')
@Controller('api/v1/todo')
export class TodoController {
  /**
   * Constructor
   * @param todoService
   */
  constructor(private todoService: TodoService) {}

  /**
   * Get All Data Todos
   */
  @Get('')
  async user() {
    return await this.todoService.getAllTodo();
  }
}
