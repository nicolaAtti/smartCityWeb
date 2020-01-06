import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AirReadingsService {

  private airReadingsApiBaseUrl = "https://o6g9wi7jga.execute-api.eu-central-1.amazonaws.com/producion";

  constructor(private httpClient: HttpClient) { }

  getLatestReading(airUnitId: string): Observable<string> {
    return this.httpClient.get<string>(this.airReadingsApiBaseUrl+"/readings/"+airUnitId+"/latest");
  };

  getReadings(airUnitId: string): Observable<string> {
    return this.httpClient.get<string>(this.airReadingsApiBaseUrl+/readings/+airUnitId);
  }



}
