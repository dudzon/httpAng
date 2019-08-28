import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(responseData => {
      this.isFetching = false;
      this.loadedPosts = responseData;
    });

  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(responseData => {
      this.isFetching = false;
      this.loadedPosts = responseData;
    });
  }

  onClearPosts() {
    // Send Http request
  }
  // private fetchPosts() {
  //   this.isFetching = true;
  //   this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-b1645.firebaseio.com/posts.json')
  //     .pipe(map(responseData => {
  //       const responseArray: Post[] = [];
  //       for (const key in responseData) {
  //         if (responseData.hasOwnProperty(key)) {
  //           responseArray.push({ ...responseData[key], id: key });
  //         }
  //       }
  //       return responseArray;
  //     }))
  //     .subscribe(responseData => {
  //       this.isFetching = false;
  //       this.loadedPosts = responseData;
  //     });
  // }
}
