import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interface/giphy.interfaces';
import { Gif } from '../interface/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { SearchResponse } from '../interface/search.interfaces';

@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    constructor(){
        this.loadTrendingGifs();
    }

    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
            params: {
                api_key: environment.apiKey,
                limit: 20,
            },
        }).subscribe( (resp)=> {

            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
            console.log({ gifs });

        })
    }

    searchGifs(query: string){
        this.http.get<SearchResponse>(`${environment.giphyUrl}/gifs/search`,{
            params:{
                api_key: environment.apiKey,
                q: query,
                limit:20,
                offset: 0,

            }
        }).subscribe((resp)=>{
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            console.log({ search: gifs });
        })
    }
   

}