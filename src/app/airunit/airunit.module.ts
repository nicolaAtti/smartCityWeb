import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AirunitComponent} from "./airunit.component";
import { AirunitRoutingModule } from './airunit-routing.module';
import {TempChartComponent} from "./temp-chart/temp-chart.component";
import {ChartsModule} from "ng2-charts";
import { OverviewComponent } from './overview/overview.component';
import {HumidityChartComponent} from "./humidity-chart/humidity-chart.component";
import { ParticlesChartComponent } from './particles-chart/particles-chart.component';
import { GasChartComponent } from './gas-chart/gas-chart.component';
import { ListReadingsComponent } from './list-readings/list-readings.component';
import {GoogleMapsModule} from "@angular/google-maps";


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
    ChartsModule,
    GoogleMapsModule
  ]
})
export class AirunitModule { }
