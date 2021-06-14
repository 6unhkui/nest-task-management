import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserDTO {
    id: number;
    username: string;
    email: string;
    image: string;
}

export class LoginDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}

export class RegisterDTO extends LoginDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
}
