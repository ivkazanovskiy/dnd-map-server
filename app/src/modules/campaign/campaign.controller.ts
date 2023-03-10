import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';
import { PaginationDto } from '../../dto/pagination.dto';
import { JwtGuard } from '../../guards/jwt-guard';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@ApiTags('Campaign')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  create(
    @GetUser() user: UserEntity,
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    return this.campaignService.create(user, createCampaignDto);
  }

  @Post(':id/session')
  createSession(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.campaignService.createSession(user, id, createSessionDto);
  }

  @Get()
  @ApiOkResponse()
  findAll(@GetUser() user: UserEntity, @Query() paginationDto: PaginationDto) {
    return this.campaignService.findAll(user, paginationDto);
  }

  @Get(':id')
  findOne(@GetUser() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.campaignService.findOne(user, id);
  }

  @Patch(':id')
  update(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(user, id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@GetUser() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.campaignService.remove(user, id);
  }

  @Delete(':id/session/:sessionId')
  removeSession(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ) {
    return this.campaignService.removeSession(user, id, sessionId);
  }
}
