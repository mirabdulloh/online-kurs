import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateRateDto {
    @ApiProperty({example: "173ef952-79bb-489d-9cfc-62db0d8114b4", description: "baholagan studentning idsi"})
    @IsNumber()
    student_id: string

    @ApiProperty({example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: "Kursning idsi"})
    @IsNumber()
    course_id: string

    @ApiProperty({example: "5", description: "Cursga qoygan bahosi "})
    @IsNumber()
    rate: number

    @ApiProperty({example: "Yaxshi kurs", description: "Kurs haqida fikri"})
    @IsOptional()
    @IsString()
    description: string
}
