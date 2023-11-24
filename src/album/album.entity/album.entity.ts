import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';
import { TrackEntity } from 'src/track/track.entity/track.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fechaLanzamiento: Date;

    @Column()
    descripcion: string;

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];

    @ManyToMany(() => PerformerEntity, performer => performer.albums)
    performers: PerformerEntity[];

    constructor(nombre: string, caratula: string, fechaLanzamiento: Date, descripcion: string) {
        this.id = uuidv4();
        this.nombre = nombre;
        this.caratula = caratula;
        this.fechaLanzamiento = fechaLanzamiento;
        this.descripcion = descripcion;
    }
}
