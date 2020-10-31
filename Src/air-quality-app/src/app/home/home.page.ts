import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { AirQualityService } from '../core/services/air-quality.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  url: string;
  measurements = [];
  page = 1;
  constructor(private airQualityService: AirQualityService) {}

  ngOnInit() {
    this.loadMore({}, true);
  }

  loadMore(event, initialLoad: boolean) {
    this.airQualityService.fetch(this.page)
      .subscribe((data: any[]) => {

        this.measurements = this.measurements.concat(data);
        this.page++;

        if(!initialLoad) {
          event.target.complete();
        }
      }, error => {
        console.log(error);
      })
  }
}
