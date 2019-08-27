import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
    // console.log(this.loadedPosts);
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-b1645.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchPosts() {
    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-b1645.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const responseArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            responseArray.push({ ...responseData[key], id: key });
          }
        }
        return responseArray;
      }))
      .subscribe(responseData => {
        this.loadedPosts = responseData;
        console.log(this.loadedPosts);
      });
  }
}
