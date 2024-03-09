import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    firstName: String;

    @IsString()
    lastName: String;

    @IsEmail()
    email: String;

    @IsString()
    password: String;
}
