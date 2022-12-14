import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import db from './db';
import { MacskakDTO } from './macskak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async macskaklista(@Query('kereses') kereses) {
    if (kereses != null) {
      const [eredmeny] = await db.execute(
        'SELECT suly, szem_szin FROM macskak WHERE szem_szin = ?',
        [kereses],
      );

      return { macskak: eredmeny };
    } else {
      const [rows] = await db.execute(
        'SELECT suly,szem_szin FROM macskak ORDER BY suly DESC',
      );
      return { macskak: rows };
    }
  }

  @Get('macskak/uj')
  @Render('macskahozzad')
  addCatForm() {
    return {};
  }

  @Post('macskak/uj')
  @Redirect()
  async addCat(@Body() macska: MacskakDTO) {
    const []: any = await db.execute(
      'INSERT INTO `macskak` (`suly`,`szem_szin`) VALUES (?, ?)',
      [macska.suly, macska.szem_szin],
    );
    return { url: '/' };
  }
}
