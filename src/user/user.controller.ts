import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Get('getUserById/:id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Delete('deleteUser/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('getUserByEmail/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
