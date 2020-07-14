import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators';
import {GlobalDataSummary} from '../modals/GlobalData';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  private indiaDataURl='https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true'
  private timeSeriesDataURL='https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1';
  getIndiaData()
  {
    return this.http.get<any>(this.indiaDataURl);
  }
  getDataForTimeSeries()
  {
    return this.http.get<any>(this.timeSeriesDataURL);
  }
}
