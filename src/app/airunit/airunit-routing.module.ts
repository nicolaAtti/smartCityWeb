import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirunitComponent } from "./airunit.component";
import {TempChartComponent} from "./temp-chart/temp-chart.component";
import {OverviewComponent} from "./overview/overview.component";


const routes: Routes = [
  {path: "", component: AirunitComponent, children: [
      {path: "temp-chart", component: TempChartComponent},
      {path: "overview", component: OverviewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirunitRoutingModule { }
