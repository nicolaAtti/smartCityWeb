import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Reading} from "../../Reading";
import {AirReadingsService} from "../../air-readings.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as L from 'leaflet';

@Component({
  selector: 'app-list-readings',
  templateUrl: './list-readings.component.html',
  styleUrls: ['./list-readings.component.sass']
})
export class ListReadingsComponent implements OnInit, AfterViewInit, OnDestroy {
  private airUnitId: string;
  private selectedReading: Reading;
  private readings: Reading[];
  private map;

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params['id'];
      this.airReadingsService.getReadings(this.airUnitId).subscribe(readings => {
        readings.reverse();
        readings.forEach( ListReadingsComponent.convertDate );
        console.log(readings);
        this.readings = readings;
        this.selectedReading = this.readings[0];
        const menu = document.getElementById("list-menu");
        menu.className = "li a active";
      });
    });
  }

  ngAfterViewInit() {
    document.getElementsByClassName("nav-link")[0].className = "nav-link-active";
    this.setMarkerAndCenter(Number(this.readings[0].latitude), Number(this.readings[0].longitude), this.readings[0].readingId);
  }


  private static convertDate(item ){
    item.date = new Date(item.date).toLocaleString("en-GB", {timeZone: "Europe/Rome"});
  }

  private setSelectedReading(reading: Reading){
    console.log(reading.readingId);
    let btn = document.getElementById(this.selectedReading.readingId);
    btn.className = "nav-link";
    btn = document.getElementById(reading.readingId);
    btn.className = "nav-link-active";
    this.selectedReading = reading;
    this.setMarkerAndCenter(Number(this.selectedReading.latitude), Number(this.selectedReading.longitude), this.selectedReading.readingId);
  }

  private setMarkerAndCenter(lat: number, lng: number, title: string) {
    this.map = L.map('mapid', {
      center: [ lat, lng ],
      zoom: 10
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    var marker = L.marker([lng, lat]).addTo(this.map);
    marker.bindPopup(title);
  }

  ngOnDestroy(): void {
    const menu = document.getElementById("list-menu");
    menu.className = "li a ";
  }
}