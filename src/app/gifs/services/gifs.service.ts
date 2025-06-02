import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interface/giphy.interfaces';
import { Gif } from '../interface/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { SearchResponse } from '../interface/search.interfaces';
import { map, Observable, tap } from 'rxjs';



@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    //cache
    searchHistory = signal<Record<string, Gif[]>>({});
    //sacar las keys
    searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

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

    searchGifs(query: string): Observable<Gif[]>{
        return this.http.get<SearchResponse>(`${environment.giphyUrl}/gifs/search`,{
            params:{
                api_key: environment.apiKey,
                q: query,
                limit:20,
                offset: 0,

            }
        }).pipe(
            map( ({ data }) => data),
            map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

            // TODO: Historial
            //actualizar señal con tap
            tap((items)=>{
                this.searchHistory.update(( history )=>({
                    ...history,
                    [query.toLowerCase()]: items,
                }))
            })
        );


        // .subscribe((resp)=>{
        //     const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        //     console.log({ search: gifs });
        // })
    }

    getHistoryGifs(query : string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
   

}