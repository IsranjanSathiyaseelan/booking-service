import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus } from './enums/booking-status.enum';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create Booking (Public)
  async create(createBookingDto: CreateBookingDto) {
    // Check if service exists
    const service = await this.prisma.service.findUnique({
      where: {
        id: createBookingDto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Booking date cannot be in the past
    const bookingDate = new Date(createBookingDto.bookingDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      throw new BadRequestException(
        'Booking date cannot be in the past',
      );
    }
    
    //Prevent duplicate bookings for the same service + date + time
    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        serviceId: createBookingDto.serviceId,
        bookingDate: new Date(createBookingDto.bookingDate),
        bookingTime: createBookingDto.bookingTime,
        status: {
          not: BookingStatus.CANCELLED,
        },
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        'This service is already booked for the selected date and time.',
      );
    }

    return this.prisma.booking.create({
      data: {
        customerName: createBookingDto.customerName,
        customerEmail: createBookingDto.customerEmail,
        customerPhone: createBookingDto.customerPhone,
        bookingDate: new Date(createBookingDto.bookingDate),
        bookingTime: createBookingDto.bookingTime,
        notes: createBookingDto.notes,
        serviceId: createBookingDto.serviceId,
      },
      include: {
        service: true,
      },
    });
  }

  // Get All Bookings
  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get Booking By ID
  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  // Update Booking Status
  async updateStatus(
    id: string,
    dto: UpdateBookingStatusDto,
  ) {
    const booking = await this.findOne(id);

    // Business Rule:
    // Cancelled bookings cannot become completed
    if (
      booking.status === BookingStatus.CANCELLED &&
      dto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled bookings cannot be marked as completed',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
      },
    });
  }

  // Cancel Booking
  async cancel(id: string) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
    });
  }
}