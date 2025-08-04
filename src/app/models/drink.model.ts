export interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

export interface DrinkDetail extends Drink {
  [key: string]: any;
}