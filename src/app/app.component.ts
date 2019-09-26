import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Smartcity Air Reporting';
  showMenu: boolean;

  constructor(router: Router){
    router.events.forEach((event) =>{
      if(event instanceof NavigationStart){
        this.showMenu = event.url == "/"
      }
    });
  }
}

