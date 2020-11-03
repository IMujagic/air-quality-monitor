import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AirQualityIndexModel } from '../models/air-quality-index.model';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {
  constructor(private http: HttpClient) { }

  fetch(page: number): Observable<AirQualityIndexModel[]> {
    return this.http.get<AirQualityIndexModel[]>(environment.apiUrl + '/air-quality-indexes?page='+page)
      .pipe(map((models: AirQualityIndexModel[]) => {
        models.map(model => {
          const labelAndColor = this.getAirQualityLabelAndColor(model.index);
          model.label = labelAndColor.label;
          model.color = labelAndColor.color;
        })

        return models;
      }));
  }

  getAirQualityLabelAndColor(index: number): any {
    switch(true)
    {
      case index <= 50: 
        return { label: 'Good', color: 'green' }
      case index > 50 && index <= 100: 
        return { label: 'Moderate', color: 'yellow' }
      case index > 100 && index <= 150: 
        return { label: 'Unhealthy for Sensitive Groups', color: 'orange' }
      case index > 150 && index <= 200: 
        return { label: 'Unhealthy', color: 'red' }
      case index > 200 && index <= 300: 
        return { label: 'Unhealthy', color: 'purple' }
      case index > 300: 
        return { label: 'Hazardous', color: 'maroon' }
    }
  }
}
