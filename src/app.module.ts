import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album/album.entity/album.entity';
import { TrackEntity } from './track/track.entity/track.entity';
import { PerformerEntity } from './performer/performer.entity/performer.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AlbumEntity, TrackEntity, PerformerEntity],
    synchronize: true,
    keepConnectionAlive: true
  }), AlbumModule, TrackModule, PerformerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
