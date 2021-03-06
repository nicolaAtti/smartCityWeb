import {Component, OnDestroy, OnInit} from '@angular/core';
import {AirReadingsService} from '../../air-readings.service';
import {Reading} from '../../Reading';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit, OnDestroy {

  airUnitId: string;
  latestReadingDate: string;
  temperatureString: string;
  humidityString: string;
  dryStatusString: string;
  dustString: string;
  pm10String: string;
  pm25String: string;
  gasString: string;
  latitudeString: string;
  longitudeString: string;
  altitudeString: string;

  caqi: number;
  caqiStatus: string;

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params.id;
      const menu = document.getElementById('overview-menu');
      menu.className = 'li a active';
      this.airReadingsService.getLatestReading(this.airUnitId).subscribe(reading => this.setLatestReadingData(reading));
      this.airReadingsService.getGasCAQI(this.airUnitId).subscribe(caqi => this.evaluateCaqi(caqi));
      window.setInterval(() => {
        this.airReadingsService.getLatestReading(this.airUnitId).subscribe(reading => this.setLatestReadingData(reading));
        this.airReadingsService.getGasCAQI(this.airUnitId).subscribe(caqi => this.evaluateCaqi(caqi));
      },30000);
    });
  }

  setLatestReadingData(latest: Reading) {
    this.temperatureString = (latest.temperatureReading !== 'Error') ? latest.temperatureReading + ' °C' : 'Error during temperature reading';
    this.latestReadingDate = (latest.date !== 'Error') ? new Date(latest.date).toLocaleString('en-GB', {timeZone: 'Europe/Rome'}) : 'Error during date reading';
    this.humidityString = (latest.humidityReading !== 'Error') ? latest.humidityReading + ' %' : 'Error during humidity reading';
    this.dryStatusString = (latest.dryOrWet !== 'Error') ? 'The device is ' + latest.dryOrWet : 'Error during reading of dry/wet state';
    this.dustString = (latest.dust !== 'Error') ? latest.dust + ' Particles/m3' : 'Error during particles reading';
    this.pm10String = (latest.pm10Reading !== 'Error') ? latest.pm10Reading + ' μg/m3' : 'Error during pm10 reading';
    this.pm25String = (latest.pm25Reading !== 'Error') ? latest.pm25Reading + ' μg/m3' : 'Error during pm2.5 reading';
    this.gasString = (latest.gasReading !== 'Error') ? latest.gasReading + ' ppm' : 'Error during CO reading';
    this.latitudeString = (latest.latitude !== 'Error') ? latest.latitude + ' °' : 'Error during latitude reading';
    this.longitudeString = (latest.longitude !== 'Error') ? latest.longitude + ' °' : 'Error during longitude reading';
    this.altitudeString = (latest.altitude !== 'Error') ? latest.altitude + ' m' : 'Error during altitude reading';
  }

  evaluateCaqi(caqiI: number) {
    if (isNaN(caqiI)) {
      this.caqi = 0;
    } else {
      this.caqi = caqiI;
    }
    const cardTitle = document.getElementById('caqi-text');
    cardTitle.style.backgroundColor = this.getColorByIndex(caqiI);
  }

  getColorByIndex(caqiI: number) {
    if (caqiI >= 0 && caqiI < 25) {
      this.caqiStatus = 'Very Low';
      return '#0bff00';
    } else if (caqiI >= 25 && caqiI < 50) {
      this.caqiStatus = 'Low';
      return '#23821b';
    } else if (caqiI >= 50 && caqiI < 75) {
      this.caqiStatus = 'Medium';
      return '#fff105';
    } else if (caqiI >= 75 && caqiI < 100) {
      this.caqiStatus = 'High';
      return '#c85300';
    } else if (caqiI >= 100){
      this.caqiStatus = 'Very High';
      return '#a20003';
    } else {
      this.caqiStatus = 'Unable to determine CAQI';
      return '#ffffff';
    }
  }

  ngOnDestroy(): void {
    const menu = document.getElementById('overview-menu');
    menu.className = 'li a';
  }

}
