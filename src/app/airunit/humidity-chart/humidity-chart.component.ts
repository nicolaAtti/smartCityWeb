import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-temp-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.sass']
})
export class HumidityChartComponent implements OnInit {
  private airUnitId: string;

  public humidityChartData: ChartDataSets[] = [
    { data: [], label: 'Humidity %' }
  ];
  public humidityChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
  public humidityChartOptions = {
    responsive: true
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
    });
  }

  private getHumidityList(readings: Reading[]){
    readings.forEach(reading => this.evaluateReading(reading.humidityReading));
  }

  private evaluateReading(readString: string){
    if(readString != "Error"){
      this.humidityChartData[0].data.push(Number(readString))
    }
  }
}
