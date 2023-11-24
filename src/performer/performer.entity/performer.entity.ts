import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class PerformerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @ManyToMany(() => PerformerEntity, performer => performer.albums)
    albums: PerformerEntity[];

    constructor(nombre: string, imagen: string, descripcion: string) {
        this.id = uuidv4();
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}
