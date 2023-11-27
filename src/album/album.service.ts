import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private albumRepository: Repository<AlbumEntity>,
    ) { }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if(album.nombre == undefined || album.nombre == "" || album.descripcion == undefined || album.descripcion == "" ){
            throw new Error("Hay que ponere nombre y descripcion");
        }
        return await this.albumRepository.save(album);
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album = await this.albumRepository.findOne({ where: { id }, relations: ['tracks', 'performers'] });
        if (!album) {
            throw new Error("Album not found");
        }
        return album;
    }

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ['tracks', 'performers'] });
    }

    async delete(id: string): Promise<AlbumEntity> {
        const album = await this.findOne(id);
        if(album.tracks.length > 0){
            return await this.albumRepository.remove(album);
        }
        throw new Error("No se puede borrar un album con canciones");
    }

}
