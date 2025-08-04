import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink, DrinkDetail } from '../models/drink.model';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class DrinkService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAlcoholicDrinks(): Observable<{ drinks: Drink[] }> {
    const url = this.configService.getApiUrl('alcoholicDrinks');
    console.log('url', url)
    return this.http.get<{ drinks: Drink[] }>(url);
  }

  getDrinkDetails(id: string): Observable<{ drinks: DrinkDetail[] }> {
    const url = this.configService.getApiUrl('drinkDetails', id);
    return this.http.get<{ drinks: DrinkDetail[] }>(url);
  }
}
