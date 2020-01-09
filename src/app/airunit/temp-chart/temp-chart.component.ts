import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.sass']
})
export class TempChartComponent implements OnInit {
  private airUnitId: string;

  public tempChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature °C' }
  ];
  public tempChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
  public tempChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            max: 50,
            min: -50
          }
        }
      ]
    },
  };
  public tempChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,173,0,0.3)',
      borderColor: 'rgba(255,87,0,0.78)'
    }
  ];
  public tempChartLegend = true;
  public tempChartType = 'line';

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params['id'];
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => this.getTemperatureList(readings));
    });
  }

  private getTemperatureList(readings: Reading[]){
    readings.forEach(reading => this.evaluateReading(reading.temperatureReading));
  }

  private evaluateReading(readString: string){
    if(readString != "Error"){
      this.tempChartData[0].data.push(Number(readString))
    }
  }
}
