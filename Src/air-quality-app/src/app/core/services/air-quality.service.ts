import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {
  constructor(private http: HttpClient) { }

  fetch(page: number) {
    return this.http.get(environment.apiUrl + '/measurements?page='+page+'&limit=' + environment.pageSize);
  }

}
