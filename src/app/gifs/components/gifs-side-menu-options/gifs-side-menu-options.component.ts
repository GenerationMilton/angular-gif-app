import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface MenuOption{
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',

})
export default class GifsSideMenuOptionsComponent {

    menuOptions: MenuOption[]=[
      {
        icon: 'fa-solid fa-chart-line',
        label: 'Trending',
        subLabel: 'Gifs Populares',
        route: '/dashboard/trending',
      },
      {
        icon: 'fa-solid fa-magnifying-glass',
        label: 'Buscador',
        subLabel: 'Buscar gifs',
        route: '/dashboard/search',
      },
    ];
 }
