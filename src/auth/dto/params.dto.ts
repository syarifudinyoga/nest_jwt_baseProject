import { ApiProperty } from '@nestjs/swagger';

export class ParamsDto {
  @ApiProperty()
  email: string;
}
