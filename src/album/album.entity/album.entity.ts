import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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

    constructor(nombre: string, caratula: string, fechaLanzamiento: Date, descripcion: string) {
        this.id = uuidv4();
        this.nombre = nombre;
        this.caratula = caratula;
        this.fechaLanzamiento = fechaLanzamiento;
        this.descripcion = descripcion;
    }
}
