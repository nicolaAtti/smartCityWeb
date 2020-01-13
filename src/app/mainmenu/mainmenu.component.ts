import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AirReadingsService} from "../air-readings.service";
import {Router} from "@angular/router";
import * as L from 'leaflet';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.sass']
})

export class MainmenuComponent implements OnInit, AfterContentInit {
  map;
  airunits = [];

  constructor(private airReadingsService: AirReadingsService, private router: Router) { }

  ngOnInit() {
    this.map = new L.Map('mapid', {
      center: [41.8719, 12.5674],
      zoom: 6
    });
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
    this.airReadingsService.getAirUnits().subscribe(airUnits => {
      this.airunits = airUnits;
      this.airunits.forEach( unit => this.airReadingsService.getLatestReading(unit.unitId).subscribe(reading => {
        this.addMarker(Number(reading.latitude), Number(reading.longitude), unit.name);
        this.router.config.push( {path: 'airunit-'+unit.unitId, loadChildren: () => import('../airunit/airunit.module').then(m => m.AirunitModule)});
      }));
      console.log(this.router.config);
    });
  }

  addMarker(lon: number, lat: number,title: string){
    var marker = L.marker([lon, lat]).addTo(this.map);
    marker.bindPopup(title);
  }

  ngAfterContentInit(): void {

  }
}
