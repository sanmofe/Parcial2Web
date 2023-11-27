import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let listaAlbums: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async (repo: Repository<AlbumEntity>) => {
    await repo.clear();
    listaAlbums = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repo.save({
        id: faker.string.uuid(),
        nombre: faker.company.name(),
        fechaLanzamiento: faker.date.past(),
        caratula: faker.image.url(),
        tracks: [],
        descripcion: faker.lorem.paragraph() 
        }
        )
        listaAlbums.push(album);
    }
  }

  //Create, findone, findall, delete

  it("should create an album", async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      tracks: [],
      performers : [],
      descripcion: faker.lorem.paragraph()
    };

    const result = await service.create(album);
    expect(result).not.toBeNull();
    expect(result.id).toEqual(album.id);
    expect(result.nombre).toEqual(album.nombre);
    expect(result.fechaLanzamiento).toEqual(album.fechaLanzamiento);
    expect(result.caratula).toEqual(album.caratula);
    expect(result.descripcion).toEqual(album.descripcion);
  });

  it("should not create an album", async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      tracks: [],
      performers : [],
      descripcion: null
    };
    await expect(service.create(album)).rejects.toThrow();
  })

  it("should find an album", async () => {  
    const album: AlbumEntity = listaAlbums[0];
    const albumFound = await service.findOne(album.id);
    expect(albumFound).not.toBeNull();
    expect(albumFound.id).toEqual(album.id);
    expect(albumFound.nombre).toEqual(album.nombre);
    expect(albumFound.fechaLanzamiento).toEqual(album.fechaLanzamiento);
    expect(albumFound.caratula).toEqual(album.caratula);
    expect(albumFound.descripcion).toEqual(album.descripcion);
  })

});
