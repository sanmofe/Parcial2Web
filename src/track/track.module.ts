import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackController } from './track.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService],
  controllers: [TrackController]
})
export class TrackModule {}
