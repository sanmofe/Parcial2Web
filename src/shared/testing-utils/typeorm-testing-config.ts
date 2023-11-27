import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { PerformerEntity } from '../../performer/performer.entity/performer.entity';
import { TrackEntity } from '../../track/track.entity/track.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [TrackEntity, PerformerEntity, AlbumEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([TrackEntity, PerformerEntity, AlbumEntity]),
];