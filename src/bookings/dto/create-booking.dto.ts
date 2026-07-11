import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsString()
  customerPhone: string;

  @IsString()
  serviceId: string;

  @IsDateString()
  bookingDate: string;

  @IsString()
  bookingTime: string;

  @IsOptional()
  @IsString()
  notes?: string;
}