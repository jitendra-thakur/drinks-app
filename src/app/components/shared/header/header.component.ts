import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ConfigService } from '../../../services/config.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AppConfig } from '../../../models/app-config.model';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterModule, NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  transparentNavbar = true;
  config?: AppConfig;
  navLinks:any = [];
  appName = 'My App';
  logoUrl?: string;

  constructor(private router: Router, private route: ActivatedRoute, private configService: ConfigService) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.setNavbarTransparency();
    });

    this.configService.config$.subscribe((config) => {
      this.navLinks = config.navLinks ?? [];
      this.setNavbarTransparency();
       this.appName = config.brand?.appName || 'My App';
      this.logoUrl = config.brand?.logoUrl || '';
    });
  }

  private setNavbarTransparency(): void {
    let currentRoute = this.route.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    this.transparentNavbar = currentRoute.snapshot.data['transparentNavbar'] !== false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
}
