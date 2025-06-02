import { Component, computed, inject} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import GifsListComponent from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent { 

  //inject service
  gifService = inject(GifService);

  //parametros as a signal and observable
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
      )
    );

    //return array of kye by a signal

    gifsByKey = computed(()=>{
      return this.gifService.getHistoryGifs(this.query())
    })

  

}
