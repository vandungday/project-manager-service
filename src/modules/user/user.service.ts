import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { buildSearchQuery } from 'src/common/helpers/build-search-query';
import { exclude } from 'src/common/helpers/exclude';
import { User } from '@/common/schemas';
import { UserRepository } from '@/common/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const isExisted = await this.userRepository.findOne({ email });
    if (isExisted) throw new BadRequestException('Email is already existed');

    const saltOrRounds = 7;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
  }

  async findAll(search?: any) {
    const {
      query,
      options: { page, limit, skip },
    } = buildSearchQuery(search);

    const users = await this.userRepository.find(query, {
      skip,
      limit,
    });

    const usersWithoutPassword = users.map((user) => {
      return exclude<User, 'password'>(user, ['password']);
    });

    const total = users.length;
    const pages = Math.ceil(total / limit) || 1;

    return { users: usersWithoutPassword, total, page, pages, limit };
  }

  async findOne(id: Types.ObjectId) {
    const user = await this.userRepository.findOne({ _id: id });

    if (!user) throw new NotFoundException('User not found');

    return exclude<User, 'password'>(user, ['password']);
  }

  update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  remove(id: Types.ObjectId) {
    const user = this.userRepository.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.findOneAndDelete({
      _id: id,
    });
  }
}
