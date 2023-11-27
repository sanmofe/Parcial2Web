import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let listaPerformers: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        PerformerService, 
        {
          provide: getRepositoryToken(PerformerEntity),
          useClass: Repository,
        }
      ],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async (repo: Repository<PerformerEntity>) => {
    await repo.clear();
    listaPerformers = [];
    for(let i = 0; i < 5; i++){
        const track: PerformerEntity = await repo.save({
        id: faker.string.uuid(),
        nombre: faker.company.name(),
        imagen: faker.image.url(),
        descripcion: faker.lorem.paragraph()
        }
        )
        listaPerformers.push(track);
    }
  }
  /**
  //Create, findone, findall

  it('should create a performer', async () => {
    const performer: PerformerEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.paragraph(1),
      albums: []
    };

    const performerCreated: PerformerEntity = await service.create(performer);
    expect(performerCreated).toEqual(performer);
  });

  it("should not create a performer", async () => {
    const codigouuid = faker.string.uuid();
    const performer: PerformerEntity = {
      id: codigouuid,
      nombre: faker.company.name(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.paragraph(100),
      albums: []
    };

    try {
      const performerCreated: PerformerEntity = await service.create(performer);
    } catch (error) {
      expect(error.message).toEqual("La descripcion debe tener como máximo 100 caracteres");
    }
    const performerFound = await service.findOne(codigouuid);
    expect(performerFound).toBeNull();
  })

  it('should find a performer by id', async () => {
    const performer: PerformerEntity = listaPerformers[0];
    const performerFound = await service.findOne(performer.id);
    expect(performerFound).not.toBeNull();
    expect(performerFound.id).toEqual(performer.id);
    expect(performerFound.nombre).toEqual(performer.nombre);
    expect(performerFound.imagen).toEqual(performer.imagen);
    expect(performerFound.descripcion).toEqual(performer.descripcion);
  });

  it("should not find a performer by id", async () => {
    const performerFound = await service.findOne(faker.string.uuid());
    expect(performerFound).toBeNull();
  })

  it('should find all performers', async () => {
    const performersFound = await service.findAll();
    expect(performersFound).not.toBeNull();
    expect(performersFound).toHaveLength(listaPerformers.length);
  });
  */
});
