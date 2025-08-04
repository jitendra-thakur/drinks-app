import { Component, Input } from '@angular/core';
import { Drink } from '../../../models/drink.model';

@Component({
  selector: 'app-drink-card',
  standalone: true,
  imports: [],
  templateUrl: './drink-card.component.html',
  styleUrl: './drink-card.component.scss'
})
export class DrinkCardComponent {
  @Input() drink!: Drink;

  navigateToDrink() {
    window.location.href = `/drink/${this.drink.idDrink}`;
  }
}
