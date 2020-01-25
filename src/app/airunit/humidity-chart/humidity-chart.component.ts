import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import {AirReadingsService} from '../../air-readings.service';
import {Reading} from '../../Reading';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

import dateFormat from "dateformat";

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
    const menu = document.getElementById('humidity-menu');
    menu.className = 'li a active';
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params.id;
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => {
        this.getHumidityList(readings);
        window.setInterval(() => this.airReadingsService.getLatestReading(this.airUnitId).subscribe(reading => this.evaluateReading(reading.humidityReading, reading.date, true)),30000);
      });
    });
  }

  getHumidityList(readings: Reading[]) {
    readings.forEach(reading => this.evaluateReading(reading.humidityReading, reading.date, false));
  }

  evaluateReading(readString: string, readLabel: string, isNew: boolean) {
    if (readString !== 'Error') {
      if(isNew && this.humidityChartData[0].data.length >= 50){
        this.humidityChartData[0].data.shift();
        this.humidityChartLabels.shift();
      }
      const date = new Date(readLabel);
      const labelString = dateFormat(date, 'dd/mm/yy - h:MM');
      this.humidityChartData[0].data.push(Number(readString));
      this.humidityChartLabels.push(`${labelString}`);
    }
  }

  ngOnDestroy(): void {
    const menu = document.getElementById('humidity-menu');
    menu.className = 'li a ';
  }
}
