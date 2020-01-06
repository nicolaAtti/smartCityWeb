import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-airunit',
  templateUrl: './airunit.component.html',
  styleUrls: ['./airunit.component.sass']
})
export class AirunitComponent implements OnInit {

  @Input()
  private id: string;

  constructor() {}

  ngOnInit() {
  }

}
