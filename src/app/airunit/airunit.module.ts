import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AirunitComponent} from "./airunit.component";
import { AirunitRoutingModule } from './airunit-routing.module';
import {TempChartComponent} from "./temp-chart/temp-chart.component";
import {ChartsModule} from "ng2-charts";
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    AirunitComponent,
    TempChartComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    AirunitRoutingModule,
    ChartsModule
  ]
})
export class AirunitModule { }
