import { HttpException, HttpStatus } from '@nestjs/common';

export class SyntaxErrorException extends HttpException {
  constructor() {
    super(
      'Impossible de récupérer la donnée à cette référence ',
      HttpStatus.BAD_REQUEST,
    );
  }
}
