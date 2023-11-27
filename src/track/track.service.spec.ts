import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity/track.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import e from 'express';
import { AlbumEntity } from 'src/album/album.entity/album.entity';

describe('TrackService', () => {
  let service: TrackService;
  let repository: Repository<TrackEntity>;
  let listaTracks: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async (repo: Repository<TrackEntity>) => {
    await repo.clear();
    listaTracks = [];
    for(let i = 0; i < 5; i++){
        const track: TrackEntity = await repo.save({
        id: faker.string.uuid(),
        nombre: faker.company.name(),
        duracion: faker.number.int()
        }
        )
        listaTracks.push(track);
    }
  }

  //Create, findone, findall

  it("should create a track", async () => {
    const track: TrackEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      duracion: faker.number.int(),
      album: null
    };

    const album: AlbumEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      tracks: [track],
      descripcion: faker.lorem.paragraph(),
      performers: []
    }

    const trackCreated = await service.create(album.id, track);
    expect(trackCreated).not.toBeNull();
    expect(trackCreated.id).toEqual(track.id);
    expect(trackCreated.nombre).toEqual(track.nombre);
    expect(trackCreated.duracion).toEqual(track.duracion);
    expect(trackCreated.album).toEqual(track.album);
  });

  it("should find a track by id", async () => {
    const track: TrackEntity = listaTracks[0];
    const trackFound = await service.findOne(track.id);
    expect(trackFound).not.toBeNull();
    expect(trackFound.id).toEqual(track.id);
    expect(trackFound.nombre).toEqual(track.nombre);
    expect(trackFound.duracion).toEqual(track.duracion);
  });

  it("should not find a track by id", async () => {
    const trackFound = await service.findOne(faker.string.uuid());
    expect(trackFound).toBeNull();
  });

  it("should find all tracks", async () => {
    const tracksFound = await service.findAll();
    expect(tracksFound).not.toBeNull();
    expect(tracksFound).toHaveLength(listaTracks.length);
  });

});
