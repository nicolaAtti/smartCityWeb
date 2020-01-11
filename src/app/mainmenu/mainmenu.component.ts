import { Component, OnInit } from '@angular/core';
import {AirReadingsService} from "../air-readings.service";

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
  airunits = [];

  constructor(private airReadingsService: AirReadingsService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });

    this.airReadingsService.getAirUnits().subscribe(airUnits => {
      this.airunits = airUnits;
      airUnits.forEach( unit => this.airReadingsService.getLatestReading(unit.unitId).subscribe(reading => {
        this.addMarker(Number(reading.latitude), Number(reading.longitude), unit.name);
      }))
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
