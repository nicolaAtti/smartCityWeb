import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AirunitComponent} from "./airunit.component";
import { AirunitRoutingModule } from './airunit-routing.module';
import {TempChartComponent} from "./temp-chart/temp-chart.component";
import { OverviewComponent } from './overview/overview.component';
import {HumidityChartComponent} from "./humidity-chart/humidity-chart.component";
import { ParticlesChartComponent } from './particles-chart/particles-chart.component';
import { GasChartComponent } from './gas-chart/gas-chart.component';
import { ListReadingsComponent } from './list-readings/list-readings.component';
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AirunitComponent,
    TempChartComponent,
    HumidityChartComponent,
    OverviewComponent,
    ParticlesChartComponent,
    GasChartComponent,
    ListReadingsComponent
  ],
  imports: [
    CommonModule,
    AirunitRoutingModule,
    ChartsModule
  ]
})
export class AirunitModule { }
