import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {
  // TODO: move to config
  base_path = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  fetch(page: number) {
    return this.http.get(this.base_path + 'measurements?_page='+page+'&_limit=20');
  }

}
