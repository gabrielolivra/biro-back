
import { Injectable } from '@nestjs/common';
import { Users } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../controllers/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}


  async create(createUserDto:CreateUserDto){
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findOne(username:string){
    return await this.usersRepository.find({where:{username}});
  }
}
