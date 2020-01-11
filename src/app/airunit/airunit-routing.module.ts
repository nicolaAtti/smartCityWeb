import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirunitComponent } from "./airunit.component";
import {TempChartComponent} from "./temp-chart/temp-chart.component";
import {OverviewComponent} from "./overview/overview.component";
import {HumidityChartComponent} from "./humidity-chart/humidity-chart.component";
import {ParticlesChartComponent} from "./particles-chart/particles-chart.component";
import {GasChartComponent} from "./gas-chart/gas-chart.component";
import {ListReadingsComponent} from "./list-readings/list-readings.component";


const routes: Routes = [
  {path: "", component: AirunitComponent, children: [
      {path: "temp-chart", component: TempChartComponent},
      {path: "overview", component: OverviewComponent},
      {path: "humidity-chart", component: HumidityChartComponent},
      {path: "particles-chart", component: ParticlesChartComponent},
      {path: "gas-chart", component: GasChartComponent},
      {path: "list-readings", component: ListReadingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirunitRoutingModule { }
