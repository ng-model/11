import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  api: string;

  constructor(private http: HttpClient) { }

  get getEndpoint(): string {
    return environment.apiUrl;
  }

  public getStates(): Observable<any> {
    const apiUrl = `${environment.apiUrl}states`;
    return this.http
      .get(apiUrl, {
        params: {
          country: 'india',
          key: environment.apiKey,
        }
      })
      .pipe(
        catchError(error => {
          throw new Error(`error in the api ${error}`);
        })
      );
  }

}
