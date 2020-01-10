import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {AirReadingsService} from "../air-readings.service";
import {Reading} from "../Reading";
import {MapMarker} from "@angular/google-maps";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.sass']
})
export class MainmenuComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 6,
  };
  markers = [];

  constructor(private airReadingsService: AirReadingsService,  private router: Router) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.airReadingsService.getReadings('5e73dd3e-a819-410e-8d8e-9cb5697bbbe2').subscribe(readings => {
      let lastRead = readings[readings.length-1];
      this.addMarker(Number(lastRead.latitude), Number(lastRead.longitude), "AirUnit 5e73");
    });
    this.airReadingsService.getReadings('67fb474a-f5c5-421e-be1f-2304212db905').subscribe(readings => {
      let lastRead = readings[readings.length-1];
      this.addMarker(Number(lastRead.latitude), Number(lastRead.longitude), "AirUnit 67fb");
    });
    this.airReadingsService.getReadings('f41bccb0-825f-455a-abb4-7f7e101c5d8f').subscribe(readings => {
      let lastRead = readings[readings.length-1];
      this.addMarker(Number(lastRead.latitude), Number(lastRead.longitude), "AirUnit f41b");
    });
    this.airReadingsService.getReadings('eca1dad9-f972-4bff-b5e1-ce2986b09c46').subscribe(readings => {
      let lastRead = readings[readings.length-1];
      this.addMarker(Number(lastRead.latitude), Number(lastRead.longitude), " AirUnit eca1");
    });
  }

  private addMarker(lat: number, lng: number, title: string) {
    this.markers.push(
      {position: {
          lat: lat,
          lng: lng,
        },
        title: title,
      }
    )
  }
}
