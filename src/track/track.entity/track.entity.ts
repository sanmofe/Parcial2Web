import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AlbumEntity } from '../../album/album.entity/album.entity'; 


@Entity()
export class TrackEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombre: string;
    
    @Column()
    duracion: number;

    @ManyToOne(() => AlbumEntity, album => album.tracks)
    album: AlbumEntity;

    constructor(nombre: string, duracion: number) {
        this.id = uuidv4();
        this.nombre = nombre;
        this.duracion = duracion;
    }
    }
