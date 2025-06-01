import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@environments/environment';
//import { environment } from '../../../../environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [RouterOutlet],
  templateUrl: './gifs-side-menu-header.component.html',

})
export default class GifsSideMenuHeaderComponent {

  envs = environment;


 }
