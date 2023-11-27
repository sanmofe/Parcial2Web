import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class TrackDto {

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly duracion: string;

    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly album: string;

    @IsNotEmpty()
    @IsString()
    readonly performer: string;

    constructor(nombre: string, url: string, duracion: string, genero: string, album: string, performer: string) {
        this.nombre = nombre;
        this.duracion = duracion;
        this.id = genero;
        this.album = album;
        this.performer = performer;
    }

}
