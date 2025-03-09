
import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../controllers/dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verifyUser = await this.usersRepository.findOne({where: {email: createUserDto.email}})
    if(verifyUser){
      throw new BadRequestException('Email already exists')
    }
  
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
   this.usersRepository.save(user);

   return {
    ...user,   
     id: user.id,
    username: user.username,
    email: user.email,
   };
  }

  async findOne(username:string){
    return await this.usersRepository.find({where:{username}});
  }
}
