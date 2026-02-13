import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardStats } from './dashboard.type';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@Resolver(() => DashboardStats)
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => DashboardStats)
  @Roles(Role.MANAGER)
  dashboardStats() {
    return this.dashboardService.getStats();
  }
}
