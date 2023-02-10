import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';

@Table({ tableName: 'modules', timestamps: true, paranoid: true })
export class Modules extends Model<Modules> {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Unikal id',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: '1', description: 'Course id' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_id: number;

  @ApiProperty({ example: 'Title', description: 'title nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Description', description: 'Description nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 'Description', description: 'Description nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Lesson)
  lessons: Lesson[];
}
