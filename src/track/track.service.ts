import { Injectable } from '@nestjs/common';
import { TrackEntity } from './track.entity/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {

    constructor(
        @InjectRepository(TrackEntity)
        private trackRepository: Repository<TrackEntity>,
        //private albumService: AlbumService,
    ) { }

    async create(albumId: string, track: TrackEntity): Promise<TrackEntity> {
        //const album = await this.albumService.findOne(albumId);
        //if(album == undefined){
        //    throw new Error("El album no existe");
        //}
        if(track.duracion <= 0){
            throw new Error("La duracion debe ser un número positivo");
        }
        return await this.trackRepository.save(track);
    }

    async findOne(id: string): Promise<TrackEntity> {
        return await this.trackRepository.findOne({ where: { id }, relations: ['album'] });
    }

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ['album'] });
    }

}
