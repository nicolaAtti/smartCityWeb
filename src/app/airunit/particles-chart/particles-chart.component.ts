import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";
import {interval} from "rxjs";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-particles-chart',
  templateUrl: './particles-chart.component.html',
  styleUrls: ['./particles-chart.component.sass']
})
export class ParticlesChartComponent implements OnInit, OnDestroy {
  airUnitId: string;

  public particlesChartData: ChartDataSets[] = [
    { data: [], label: 'Pm 10 Levels' },
    { data: [], label: 'Pm 25 Levels' }
    ];
  public particlesChartLabels: Label[] = [];
  public particlesChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            max: 200,
            min: 0
          }
        }
      ]
    },

  };
  public particlesChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public particlesChartLegend = true;
  public particlesChartType: ChartType = 'line';
  public particlesChartPlugins = [];

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params['id'];
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => this.getParticlesList(readings));
      const menu = document.getElementById("particles-menu");
      menu.className = "li a active";
      interval(40000).pipe(startWith(0), switchMap(() => this.airReadingsService.getLatestReading(this.airUnitId))).subscribe(reading => this.evaluateReading(reading.pm10Reading, reading.pm25Reading,reading.date));
    });
  }

  private getParticlesList(readings: Reading[]){
    readings.forEach(reading => {
      this.evaluateReading(reading.pm10Reading, reading.pm25Reading, reading.date);
    });
  }
  private evaluateReading(readPm10String: string, readPm25String: string, readLabel: string){
    let pm10Added = false;
    let pm25Added = false;
    if(readPm10String !== "Error"){
      this.particlesChartData[0].data.push(Number(readPm10String))
      pm10Added = true;
    }
    if(readPm25String !== "Error"){
      this.particlesChartData[1].data.push(Number(readPm25String))
      pm25Added = true;
    }
    if(pm10Added || pm25Added){
      const date = new Date(readLabel);
      const labelString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      this.particlesChartLabels.push(`${labelString}`);
    }
  }

  ngOnDestroy(): void {
    const menu = document.getElementById("particles-menu");
    menu.className = "li a ";
  }

}
