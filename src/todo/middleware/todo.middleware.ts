import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TodoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('todo Middleware');
    next();
  }
}
