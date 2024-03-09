import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class EditTodoDto {

    @IsInt()
    id: number;

    @IsString()
    status: string;

    @IsString()
    description: string;
}