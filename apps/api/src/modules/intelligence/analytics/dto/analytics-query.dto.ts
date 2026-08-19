import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum Timeframe {
  TODAY = 'today',
  LAST_7_DAYS = '7d',
  LAST_30_DAYS = '30d',
  LAST_90_DAYS = '90d',
  YEAR_TO_DATE = 'ytd',
}

export class AnalyticsQueryDto {
  @IsOptional()
  @IsEnum(Timeframe)
  timeframe?: Timeframe = Timeframe.LAST_30_DAYS;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
