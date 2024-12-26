import { updateUserDto, UserDto, UserResponseDto } from 'src/dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Post('create')
  createUser(@Body() userDto: UserDto): Promise<UserResponseDto> {
    return this.userService.createUser(userDto);
  }

  @Post('update/:id')
  updateUser(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() updateUserDto: updateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('/:id')
  getUserById(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return this.userService.getUserById(id);
  }

  @Delete('/:id')
  deleteUser(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return this.userService.deleteUser(id);
  }
}
