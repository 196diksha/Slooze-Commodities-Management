import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardController } from './dashboard.controller';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  providers: [DashboardService, DashboardResolver, RolesGuard],
  controllers: [DashboardController],
})
export class DashboardModule {}
