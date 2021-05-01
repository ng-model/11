import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  states: any;
  cities: any;
  nearByData: any;
  currentDate: string;
  city: any;
  state: any;
  now: string;
  humidity: number;

  constructor(private weather: WeatherService) {
    setInterval(() => {
      this.now = moment().format('LTS');
    }, 1);
  }

  ngOnInit(): void {
    this.getAllStates();
    this.getNearMeClimate();
  }

  getAllStates() {
    this.weather.getStates().pipe(take(1))
      .subscribe(data => {
        if (!data) return;
        this.states = data.data;
      },
        (error: any) => {
          console.error('Error to retrieve the data', error);
        }
      );
  }

  getAllCities(state) {
    this.weather.getCities(state).pipe(take(1))
      .subscribe(data => {
        if (!data) return;
        this.cities = data.data;
      },
        (error: any) => {
          console.error('Error to retrieve the data', error);
        }
      );
  }

  getNearMeClimate() {
    this.weather.nearMeClimate().pipe(take(1))
    .subscribe(data => {
      if (!data) return;
      this.nearByData = data.data;
      this.city = this.nearByData.city;
      this.state = this.nearByData.state;
      this.currentDate = moment(this.nearByData.current.weather.ts).format('dddd LL');
      this.humidity = this.nearByData.current.weather.hu;
      console.log(this.humidity);
      
    },
      (error: any) => {
        console.error('Error to retrieve the data', error);
      }
    );
}

}
