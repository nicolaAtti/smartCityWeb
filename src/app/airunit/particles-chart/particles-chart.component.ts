import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-particles-chart',
  templateUrl: './particles-chart.component.html',
  styleUrls: ['./particles-chart.component.sass']
})
export class ParticlesChartComponent implements OnInit {
  private airUnitId: string;

  public particlesChartData: ChartDataSets[] = [
    { data: [], label: 'Pm 10 Levels' },
    { data: [], label: 'Pm 25 Levels' }
    ];
  public particlesChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
  public particlesChartOptions: ChartOptions = {
    responsive: true,
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
    });
  }

  private getParticlesList(readings: Reading[]){
    readings.forEach(reading => {
      this.evaluateReading(reading.pm10Reading, reading.pm25Reading);
    });
  }
  private evaluateReading(readPm10String: string, readPm25String: string){
    if(readPm10String != "Error"){
      this.particlesChartData[0].data.push(Number(readPm10String))
    }
    if(readPm25String != "Error"){
      this.particlesChartData[1].data.push(Number(readPm25String))
    }
  }

}
