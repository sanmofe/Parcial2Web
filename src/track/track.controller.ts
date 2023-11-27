import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TrackService } from './track.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { TrackEntity } from './track.entity/track.entity';

@Controller('track')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {

    constructor(private readonly trackService: TrackService){}

    @Get()
    async findAll(): Promise<TrackEntity[]>{
        return await this.trackService.findAll();
    }

    @Get(":id")
    async findOne(id: string): Promise<TrackEntity>{
        return await this.trackService.findOne(id);
    }

    @Post()
    async create(track: TrackEntity): Promise<TrackEntity>{
        return await this.trackService.create(null, track);
    }

    

}
