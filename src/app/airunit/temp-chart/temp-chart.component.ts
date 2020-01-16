import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";
import {interval} from "rxjs";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.sass']
})
export class TempChartComponent implements OnInit, OnDestroy {
  airUnitId: string;

  public tempChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature °C' }
  ];
  public tempChartLabels: Label[] = [];
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
      const menu = document.getElementById("temp-menu");
      menu.className = "li a active";
      //interval(40000).pipe(startWith(0), switchMap(() => this.airReadingsService.getLatestReading(this.airUnitId))).subscribe(reading => this.evaluateReading(reading.temperatureReading,reading.date));
    });
  }

  getTemperatureList(readings: Reading[]){
    readings.forEach(reading => this.evaluateReading(reading.temperatureReading, reading.date));
  }

  evaluateReading(readString: string, readLabel: string){
    if(readString !== "Error"){
      const date = new Date(readLabel);
      const labelString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      this.tempChartData[0].data.push(Number(readString));
      this.tempChartLabels.push(`${labelString}`);
    }
  }

  ngOnDestroy(): void {
    const menu = document.getElementById("temp-menu");
    menu.className = "li a";
  }
}
