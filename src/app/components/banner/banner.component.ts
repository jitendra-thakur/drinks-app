import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  title = 'Discover Your Perfect Drink';
  subtitle = 'Browse curated cocktails and mocktails, just for you.';
  backgroundImage = 'https://source.unsplash.com/1600x500/?nature,water'; // Change as needed
}
