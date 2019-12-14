import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  tin: string;

  @IsOptional()
  phoneNo: string;

  @IsOptional()
  lastPassword: string;
}
