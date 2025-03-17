import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import { UserFormDialogComponent } from './user-form/user-form-dialog.component';

const COMPONENTS = [
	UserTableComponent,
	UserChartComponent,
	UserFormDialogComponent,
  DashboardComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  exports: []
})
export class DashboardModule { }
