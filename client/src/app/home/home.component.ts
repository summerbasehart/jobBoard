import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { PostService } from '../post.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  post: Post = {
    category: '',
    id: '',
    postTitle: '',
    postAuthor: '',
    postContent: '',
    postReference: '',
    created: null,
    updated: null
  };
  posts: Post[] = [];
  isLoadingResults = true;

  constructor(private api: HomeService) { }

  ngOnInit() {
    this.api.getPosts()
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  
}
