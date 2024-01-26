import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public menuItems = [
    {
      path: '/',
      icon: 'home',
    },
    {
      path: '/favorites',
      icon: 'favorites',
    },
    {
      path: '/cart',
      icon: 'shopping_cart',
    },
    {
      path: '/profile',
      icon: 'account_circle',
    },
  ];
}
