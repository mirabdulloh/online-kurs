import { Modules } from './../../modules/entities/module.entity';
import { CourseHighlight } from './../../course_highlights/entities/course_highlight.entity';
import { Highlight } from './../../highlights/entities/highlight.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
import { Statistic } from '../../statistics/entities/statistic.entity';

@Table({ tableName: 'course', timestamps: true, paranoid: true })
export class Course extends Model<Course> {

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
  
  @ApiProperty({ example: 'image.jpeg', description: 'Course foni uchun rasm' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({ example: 'image.svg', description: 'Course logosi' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course sub title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sub_title: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;


  @ApiProperty({
    example: 'Curse haqida',
    description: 'Course haqida malumotlar',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;


  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Curs haqida highlights' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  category_id: string;


  @ApiProperty({ example: '', description: 'Course narxi' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  price: number;


  @ApiProperty({ example: '3', description: 'Course darajasi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  level: number;


  @ApiProperty({ example: '46', description: 'Coursedagi darslar soni' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  lessons: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => CourseHighlight)
  highlights: CourseHighlight[];

  @HasOne(() => Statistic)
  statistics: Statistic

  @HasMany(() => Modules)
  modules: Modules
}
