import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AirReadingsService} from '../../air-readings.service';
import {Reading} from '../../Reading';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import dateFormat from "dateformat";
@Component({
  selector: 'app-gas-chart',
  templateUrl: './gas-chart.component.html',
  styleUrls: ['./gas-chart.component.sass']
})
export class GasChartComponent implements OnInit, OnDestroy {
  airUnitId: string;

  public gasChartData: ChartDataSets[] = [
    { data: [], label: 'CO Reading' },
  ];
  public gasChartLabels: Label[] = [];
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
    const menu = document.getElementById('gas-menu');
    menu.className = 'li a active';
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params.id;
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => {
        this.getGasList(readings);
        window.setInterval(() => this.airReadingsService.getLatestReading(this.airUnitId).subscribe(reading => this.evaluateReading(reading.humidityReading, reading.date, true)),30000);
      });
    });
  }

  getGasList(readings: Reading[]) {
    readings.forEach(reading => this.evaluateReading(reading.gasReading, reading.date, false));
  }
  evaluateReading(readString: string, readLabel: string, isNew: boolean) {
    if (readString !== 'Error') {
      if(isNew && this.gasChartData[0].data.length >= 50){
        this.gasChartData[0].data.shift();
        this.gasChartLabels.shift();
      }
      const date = new Date(readLabel);
      const labelString = dateFormat(date, 'dd/mm/yy - h:MM');
      this.gasChartData[0].data.push(Number(readString));
      this.gasChartLabels.push(`${labelString}`);
    }
  }

  ngOnDestroy(): void {
    const menu = document.getElementById('gas-menu');
    menu.className = 'li a';
  }

}
