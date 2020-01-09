import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-airunit',
  templateUrl: './airunit.component.html',
  styleUrls: ['./airunit.component.sass']
})
export class AirunitComponent implements OnInit {

  private airUnitId: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.airUnitId = params['id']);
  }

}
