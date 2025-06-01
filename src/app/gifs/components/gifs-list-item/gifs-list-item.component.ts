import { Component, input } from '@angular/core';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',

})
export default class GifsListItemComponent {

  imageUrl = input.required<string>();
 }
