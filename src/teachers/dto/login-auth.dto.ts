import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({example: "user@gmail.com", description: "Foydalanuvchi elektron pochtasi"})
    @IsEmail({},{message: "Email noto'g'ri"})
    readonly email: string

    @ApiProperty({example: "1234", description: "Foydalanuvchi paroli "})
    @IsString()
    @IsNotEmpty()
    @MinLength(4,{message: "Parol kamida 4ta belgidan iboraat bo'lisi keral "})
    readonly password: string
}