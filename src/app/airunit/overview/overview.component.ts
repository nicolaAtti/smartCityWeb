import { Component, OnInit } from '@angular/core';
import {AirReadingsService} from "../../air-readings.service";
import {Reading} from "../../Reading";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit {
  private airUnitId: string;

  private latestReading: Reading;
  private latestReadingDate: string;
  private dryStatus: string;

  constructor(private route: ActivatedRoute, private router: Router, private airReadingsService: AirReadingsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.airUnitId = params['id'];
      this.airReadingsService.getLatestReading(this.airUnitId).subscribe(reading => this.setLatestReadingData(reading));
    });
  }


  setLatestReadingData(latest: Reading){
    this.latestReadingDate = new Date(latest.date).toUTCString();
    this.latestReading = latest;
    this.dryStatus = "The device is "+latest.dryOrWet;
    //TODO Compose strings depending on Error tag
  }

}
