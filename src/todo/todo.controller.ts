import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
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
  async todo() {
    return await this.todoService.getAllTodo();
  }

  /**
   * Create Data Todos
   */
  @Post('')
  async create(@Body() dto: TodoDto) {
    return await this.todoService.createTodo(dto);
  }

  /**
   * Update Todos
   */
  @Patch(':id')
  async profile(@Param('id') id: number, @Body() dto: TodoDto) {
    return await this.todoService.update(id, dto);
  }
}
