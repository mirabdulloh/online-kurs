import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../uploads/files.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules) private moduleRepository: typeof Modules,
    private readonly fileService: FilesService,
  ) {}
  async create(createModuleDto: CreateModuleDto, file: any) {
    try {
      createModuleDto.course_id = Number(createModuleDto.course_id);
      if (file) {
        const fileName = await this.fileService.createFile(file);
        const lesson = await this.moduleRepository.create({
          ...createModuleDto,
          image: fileName,
        });
        return lesson;
      } else {
        const lesson = await this.moduleRepository.create(createModuleDto);
        return lesson;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.moduleRepository.findAll({
        attributes: ['course_id', 'title', 'description', 'image'],
        include: { all: true },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.moduleRepository.findByPk(id, {
        attributes: ['course_id', 'title', 'description', 'image'],
        include: { all: true },
      });
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateModuleDto: UpdateModuleDto, file: any) {
    try {
      const data = await this.moduleRepository.findByPk(id);
      if (!data)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      if (file) {
        await this.fileService.removeFile(data.image);
        const fileName = await this.fileService.createFile(file);

        return await this.moduleRepository.update(
          {
            ...updateModuleDto,
            image: fileName,
          },
          {
            where: { id: id },
          },
        );
      }
      return await this.moduleRepository.update(updateModuleDto, {
        where: { id: id },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.moduleRepository.findByPk(id);
      if (!data)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.moduleRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
