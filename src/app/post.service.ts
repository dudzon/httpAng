import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {
  }
  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title, content };
    console.log(postData);
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-b1645.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-b1645.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const responseArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            responseArray.push({ ...responseData[key], id: key });
          }
        }
        return responseArray;
      }));
  }

}
