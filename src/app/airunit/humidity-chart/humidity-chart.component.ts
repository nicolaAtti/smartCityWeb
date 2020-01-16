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
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.sass']
})
export class HumidityChartComponent implements OnInit, OnDestroy {
  airUnitId: string;

  public humidityChartData: ChartDataSets[] = [
    { data: [], label: 'Humidity %' }
  ];
  public humidityChartLabels: Label[] = [];
  public humidityChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            steps : 20,
            stepValue : 5,
            max : 100,
            min: 0
          }
        }
      ]
    },
  };
  public humidityChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0,0,255,0.3)',
      borderColor: 'rgba(0,0,255,1)'
    }
  ];
  public humidityChartLegend = true;
  public humidityChartType = 'line';

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params['id'];
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => this.getHumidityList(readings));
      const menu = document.getElementById("humidity-menu");
      menu.className = "li a active";
      interval(40000).pipe(startWith(0), switchMap(() => this.airReadingsService.getLatestReading(this.airUnitId))).subscribe(reading => this.evaluateReading(reading.humidityReading,reading.date));
    });
  }

  getHumidityList(readings: Reading[]){
    readings.forEach(reading => this.evaluateReading(reading.humidityReading, reading.date));
  }

  evaluateReading(readString: string, readLabel: string){
    if(readString !== "Error"){
      const date = new Date(readLabel);
      const labelString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      this.humidityChartData[0].data.push(Number(readString));
      this.humidityChartLabels.push(`${labelString}`);
    }
  }

  ngOnDestroy(): void {
    const menu = document.getElementById("humidity-menu");
    menu.className = "li a ";
  }
}
