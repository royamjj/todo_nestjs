import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post('create')
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Req() request: JwtRequest) {
    const userId = request.user.userId;
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('getAllTodos')
  findAll(@Req() request: JwtRequest) {
    const userId = request.user.userId;
    return this.todoService.findAll(userId);
  }

  @Post('editTodo')
  editTodo(@Req() request: JwtRequest, @Body(ValidationPipe) editTodoDto: EditTodoDto) {
    const userId = request.user.userId;
    return this.todoService.editTodo(userId, editTodoDto);
  }

  @Get('getTodoByStatus/:status')
  getTodoByStatus(@Req() request: JwtRequest, @Param('status') status: String) {
    const userId = request.user.userId;
    return this.todoService.getTodoByStatus(userId, status);
  }
}

interface JwtRequest extends Request {
  user?: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}