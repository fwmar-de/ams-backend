import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto, GetLocationDto, UpdateLocationDto } from './dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async createLocation(
    @Body() dto: CreateLocationDto,
  ): Promise<GetLocationDto> {
    const newLocation = await this.locationService.createLocation(dto);
    return new GetLocationDto(newLocation);
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<GetLocationDto> {
    const location = await this.locationService.getLocationById(id);
    return new GetLocationDto(location);
  }

  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,
  ): Promise<GetLocationDto> {
    const updatedLocation = await this.locationService.updateLocation(id, dto);
    return new GetLocationDto(updatedLocation);
  }

  @Delete(':id')
  async deleteLocationById(@Param('id') id: string): Promise<void> {
    return await this.locationService.deleteLocationById(id);
  }
}
