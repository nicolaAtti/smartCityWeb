import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.prod";
import {Reading} from "./Reading";
import {AirUnit} from "./AirUnit";

@Injectable({
  providedIn: 'root'
})

export class AirReadingsService {

  private airReadingsApiBaseUrl = environment.air_reading_api_base_url;

  constructor(private httpClient: HttpClient) { }

  getLatestReading(airUnitId: string): Observable<Reading> {
    return this.httpClient.get<Reading>(this.airReadingsApiBaseUrl+"/units/"+airUnitId+"/readings/latest");
  }

  getReadings(airUnitId: string): Observable<Reading[]>{
    return this.httpClient.get<Reading[]>(this.airReadingsApiBaseUrl+"/units/"+airUnitId+"/readings");
  }

  getAirUnits(): Observable<AirUnit[]> {
    return this.httpClient.get<AirUnit[]>(this.airReadingsApiBaseUrl+"/units");
  }

}
