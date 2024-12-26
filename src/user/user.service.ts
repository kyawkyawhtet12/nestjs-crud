import { Injectable } from '@nestjs/common';
import { updateUserDto, UserDto, UserResponseDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: UserDto): Promise<UserResponseDto> {
    const hashedPassword = await argon.hash(userDto.password);
    const user = await this.prisma.user.create({
      data: {
        name: userDto.name,
        email: userDto.email,
        password: hashedPassword,
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
  }

  async getAllUser(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        name: true,
        id: true,
        email: true,
      },
    });

    return users;
  }

  async updateUser(id: number, updateDto: updateUserDto): Promise<UserResponseDto> {
    const updatedUser = this.prisma.user.update({
      data: updateDto,
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  }
}
