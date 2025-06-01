import { Component, input } from '@angular/core';
import GifsListItemComponent from '../gifs-list-item/gifs-list-item.component';
import { Gif } from '../../interface/gif.interfaces';

@Component({
  selector: 'gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  
})
export default class GifsListComponent { 

  gifs = input.required<Gif[]>();

}
