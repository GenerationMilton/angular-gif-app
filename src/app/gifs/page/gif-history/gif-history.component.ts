import { Component, inject} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent { 

  //parametros as a signal and observable
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
      )
    );
  

}
