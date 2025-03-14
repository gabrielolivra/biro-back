import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;


  @IsEmail()
  @IsNotEmpty()
  email: string;
}
