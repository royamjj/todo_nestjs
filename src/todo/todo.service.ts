import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { Constants } from 'src/utils/constants';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { UserService } from 'src/user/user.service';
import { EditTodoDto } from './dto/edit-todo.dto';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private userService: UserService,
  ) { }

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let newToDo: Todo = new Todo();
    newToDo.description = createTodoDto.description;
    newToDo.status = Constants.TODO_STATUS.IN_PROGRESS;
    newToDo.user = await this.userService.findUserById(userId);
    return this.todoRepository.save(newToDo);
  }

  async findAll(userId: number) {
    return this.todoRepository.find({
      relations: ['user'], // user entity should also be loaded 
      where: {
        user: { id: userId }
      }
    });
  }

  async editTodo(userId: number, editTodoDto: EditTodoDto) {
    let todo = await this.todoRepository.findOne({
      relations: ['user'],
      where: { user: { id: userId }, id: editTodoDto.id }
    }
    );
    todo.status = editTodoDto.status;
    todo.description = editTodoDto.description;
    return this.todoRepository.save(todo);
  }

  async getTodoByStatus(userId: number, status: String) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, status: status }
    }
    );
  }
}
