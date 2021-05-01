import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  states: any;
  cities: any;

  constructor(private weather: WeatherService) { }

  ngOnInit(): void {
    this.getAllStates();
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

}
