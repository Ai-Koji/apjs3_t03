import { Module } from '@nestjs/common';
import { GameController } from './web/controller/game.controller';
import { GameService } from './domain/service/game.service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameController],
})
export class AppModule {}
