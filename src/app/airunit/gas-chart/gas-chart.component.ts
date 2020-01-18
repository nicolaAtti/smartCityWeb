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
    { data: [], label: 'Gas Reading' },
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
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params.id;
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => this.getGasList(readings));
      const menu = document.getElementById('gas-menu');
      menu.className = 'li a active';
      interval(30000).pipe(startWith(0), switchMap(() => this.airReadingsService.getLatestReading(this.airUnitId))).subscribe(reading => this.evaluateReading(reading.gasReading, reading.date));
    });
  }

  getGasList(readings: Reading[]) {
    readings.forEach(reading => this.evaluateReading(reading.gasReading, reading.date));
  }
  evaluateReading(readString: string, readLabel: string) {
    if (readString !== 'Error') {
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
