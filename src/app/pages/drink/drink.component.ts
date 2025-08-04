import { Component } from '@angular/core';
import { Drink } from '../../models/drink.model';
import { DrinkService } from '../../services/drink.service';
import { DrinkCardComponent } from '../../components/shared/drink-card/drink-card.component';
import { NgFor } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [DrinkCardComponent, NgFor, MatGridListModule, BannerComponent],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.scss'
})
export class DrinkComponent {
  drinks: Drink[] = [];
  constructor(private drinkService: DrinkService) {}
  ngOnInit() {
    console.log('tesxt')
    this.drinkService.getAlcoholicDrinks().subscribe(res => this.drinks = res.drinks);
  }
}
