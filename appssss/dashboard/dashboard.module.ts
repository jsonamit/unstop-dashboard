import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module'; // Import Shared Module
import { UserTableComponent } from './user-table/user-table.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import { UserFormDialogComponent } from '../user-form/user-form-dialog/user-form-dialog.component';


@NgModule({
  declarations: [
    UserTableComponent, UserChartComponent, UserFormDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
