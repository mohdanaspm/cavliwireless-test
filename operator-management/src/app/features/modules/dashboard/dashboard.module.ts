import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { TariffDetailsComponent } from './tariff-details/tariff-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ZoneListComponent,
    TariffDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
