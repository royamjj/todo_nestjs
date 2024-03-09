import { IsEmail, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    description: String;
}
