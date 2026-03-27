
import { GameRepositoryImpl } from 'src/datasource/repository/game.repository';
import { GameWebMapper } from 'src/web/mapper/game.mapper';
import { GameService } from 'src/domain/service/game.service';
import { Controller, Post, Body, Get, Param, BadRequestException, NotFoundException} from '@nestjs/common';

@Controller('game')
export class GameController {
constructor(
    private readonly gameService: GameService,
    private readonly gameRepo: GameRepositoryImpl // Если нужно напрямую
  ) {}

  @Post(':uuid')
  playerMove(@Param('uuid') uuid: string | null, @Body() body: any) {    
    if (!body || !body.board) {
      throw new BadRequestException('Invalid request');
    }
    body.id = uuid == 'null' ? null : uuid;


    let gameOrigin = this.gameRepo.getById(uuid? uuid : "");
    if (!gameOrigin && uuid != 'null') {
      throw new NotFoundException(`Game with id ${uuid} not found`);
    }

    let gameDomain = GameWebMapper.toDomain(body);

    if (gameOrigin) {
      if (!this.gameService.validateNewBoard(gameOrigin, gameDomain))
        return new BadRequestException('некорректное поле');
    }
    
    if (!this.gameService.validateBoard(gameDomain)) {
      throw new BadRequestException('Invalid board');
    }

    if (this.gameService.isEnd(gameDomain)) {
      return GameWebMapper.toDto(gameDomain, this.gameService.isEnd(gameDomain));
    }

    let position = this.gameService.getNextMove(gameDomain);
    gameDomain.board[position.x][position.y] = 2;
    
    this.gameRepo.save(gameDomain);
    return GameWebMapper.toDto(gameDomain, this.gameService.isEnd(gameDomain));
  }
  @Get()
  list(): string {
    return this.gameRepo.getAll();
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