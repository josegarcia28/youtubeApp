import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAz-1FpWfHdF6Y3V2DpOCzeFjB8cv8yPk4';
  private playList = 'UU9ZuezXHTQu3y8Qi39tr10Q';
  private nextPageToken = '';

  constructor(private http: HttpClient) {
  }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken)
      
    return this.http.get<YoutubeResponse>(url, {params})
      .pipe( 
        map (resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map( items => items.map(video => video.snippet) )
      ) 
  }
}
