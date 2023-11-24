import { Injectable } from '@nestjs/common';
import { PerformerEntity } from './performer.entity/performer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PerformerService {

    constructor(
        @InjectRepository(PerformerEntity)
        private performerRepository: Repository<PerformerEntity>,
    ) { } 

    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        if(performer.descripcion.length >= 100){
            throw new Error("La descripcion debe tener como máximo 100 caracteres");
        }
        return await this.performerRepository.save(performer);
    }

    async findOne(id: string): Promise<PerformerEntity> {
        return await this.performerRepository.findOne({ where: { id }, relations: ['albums'] });
    }

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find({ relations: ['albums'] });
    }

}
