import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../environments/environment.prod";
import {Reading} from "./Reading";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AirReadingsService {

  private airReadingsApiBaseUrl = environment.air_reading_api_base_url;

  constructor(private httpClient: HttpClient) { }

  getLatestReading(airUnitId: string): Observable<Reading> {
    return this.httpClient.get<Reading>(this.airReadingsApiBaseUrl+"/readings/"+airUnitId+"/latest");
  }

  getReadings(airUnitId: string): Observable<Reading[]>{
    return this.httpClient.get<Reading[]>(this.airReadingsApiBaseUrl+/readings/+airUnitId);
  }

}
