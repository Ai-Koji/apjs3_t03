
import { GameRepositoryImpl } from 'src/datasource/repository/game.repository';
import { GameWebMapper } from 'src/web/mapper/game.mapper';
import { GameService } from 'src/domain/service/game.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('game')
export class GameController {
constructor(
    private readonly gameService: GameService,
    private readonly gameRepo: GameRepositoryImpl // Если нужно напрямую
  ) {}

  @Post(':uuid')
  playerMove(@Param('uuid') uuid: string | null, @Body() body: any) {
    body.id = uuid;

    let gameDomain = GameWebMapper.toDomain(body);

    try {
      if (!this.gameService.validateBoard(gameDomain)) {
        // return this.gameService
      }

      console.log(this.gameService.getNextMove(gameDomain))
      this.gameRepo.save(gameDomain);
    }
    catch (error) {
      // TODO: 500
    }
  }
  @Get()
  test(): string {
    return 'test message';
  }
}
//POST:
// /game/{UUID}
// Body:
// {
//     "board": [
//         [0, 0, 0],
//         [0, 0, 0],
//         [0, 0, 0]
//     ]
// }

// если uuid не найден, то возвращаем 404
// если uuid = null, то создается новая игра
// если board не валидно, то возвращаем 400