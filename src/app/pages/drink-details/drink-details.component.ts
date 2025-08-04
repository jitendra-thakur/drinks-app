import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkService } from '../../services/drink.service';
import {MatCardModule} from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-drink-details',
  standalone: true,
  imports: [MatCardModule, NgFor, MatButtonModule, NgIf, MatGridListModule, MatChipsModule, MatIconModule],
  templateUrl: './drink-details.component.html',
  styleUrl: './drink-details.component.scss'
})
export class DrinkDetailsComponent implements OnInit {
  drink: any;
  ingredients: string[] = [];
  instructionKeys: string[] = [];

  constructor(private route: ActivatedRoute, private drinkService: DrinkService) {}

  availableLanguages: { key: string; label: string }[] = [];
  selectedLangKey = 'strInstructions'; // default: Englis

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.drinkService.getDrinkDetails(id).subscribe(res => {
      this.drink = res.drinks[0];
      this.extractIngredients();
      this.extractAvailableLanguages();
    });
  }

  extractIngredients() {
    this.ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = this.drink[`strIngredient${i}`];
      const measure = this.drink[`strMeasure${i}`];
      if (ingredient) {
        this.ingredients.push(measure ? `${measure.trim()} ${ingredient}` : ingredient);
      }
    }
  }

  extractAvailableLanguages() {
    this.availableLanguages = Object.keys(this.drink)
      .filter((key) => key.startsWith('strInstructions') && this.drink[key])
      .map((key) => ({
        key,
        label: key.replace('strInstructions', '') || 'EN'
      }));
    console.log('this.availableLanguages', this.availableLanguages)
  }

  selectLanguage(langKey: string) {
    this.selectedLangKey = langKey;
  }
}
