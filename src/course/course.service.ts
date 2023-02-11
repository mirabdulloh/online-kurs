import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../uploads/files.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly fileService: FilesService,
  ) {}
  async create(createCourseDto: CreateCourseDto, file: any) {
    try {
      createCourseDto.price = Number(createCourseDto.price)
      if (file) {
        const fileName = await this.fileService.createFile(file);
        await this.courseRepository.create({
          ...createCourseDto,
          image: fileName,
        });
        return {
          statusCode: 201,
          message: 'Created',
        };
      } else {
        await this.courseRepository.create(createCourseDto);

        return {
          statusCode: 201,
          message: 'Created',
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.findAll({
        attributes: ['id','category_id', 'title', 'description', 'image', 'price'],
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      return await this.courseRepository.findByPk(id, {
        attributes: ['id','category_id', 'title', 'description', 'image', 'price'],
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, file: any) {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      if (!file) {
        await this.fileService.removeFile(course.image);
        const fileName = await this.fileService.createFile(file);

        return await this.courseRepository.update(
          {
            ...updateCourseDto,
            image: fileName,
          },
          {
            where: { id: id },
          },
        );
      }
      return await this.courseRepository.update(updateCourseDto, {
        where: { id: id },
        returning: true,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      return await this.courseRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
