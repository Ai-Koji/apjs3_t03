import { Module } from '@nestjs/common';
import { GameRepositoryImpl } from './datasource/repository/game.repository';
import { GameService } from './domain/service/game.service';
import { GameController } from './web/controller/game.controller';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameRepositoryImpl],
})
export class AppModule {}
