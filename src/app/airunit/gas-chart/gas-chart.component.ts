import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-gas-chart',
  templateUrl: './gas-chart.component.html',
  styleUrls: ['./gas-chart.component.sass']
})
export class GasChartComponent implements OnInit {
  private airUnitId: string;

  public gasChartData: ChartDataSets[] = [
    { data: [], label: 'Gas Reading' },
  ];
  public gasChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
  public gasChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            max : 1000,
            min: 0
          }
        }
      ]
    },
  };
  public gasChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(120,111,111,0.3)',
    },
  ];
  public gasChartLegend = true;
  public gasChartType: ChartType = 'line';
  public gasChartPlugins = [];

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params['id'];
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => this.getGasList(readings));
    });
  }

  private getGasList(readings: Reading[]){
    readings.forEach(reading => this.evaluateReading(reading.gasReading));
  }
  private evaluateReading(readString: string){
    if(readString != "Error"){
      this.gasChartData[0].data.push(Number(readString))
    }
  }

}
