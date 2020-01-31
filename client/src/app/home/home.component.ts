import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { Page } from '../page/page';
import { HomeService } from '../home.service';
import * as $ from 'jquery';

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
    postDescription: '',
    postQualifications: '',
    postReference: '',
    updated: null
  };
  posts: Post[] = [];
  isLoadingResults = true;
  selectedPost: Post = null;
  page: Page = {
    id: '',
    pageName: '',
    pageHeader: '',
    pageEmpl: '',
    pageCont: '',
    updated: null
  }
  pages: Page[] = [];

  constructor(private api: HomeService) { }

  selectPost(post) {
    this.selectedPost = post;
    console.log(this.selectedPost);
  }

    ngOnInit() {
      this.api.getPages()
        .subscribe((res: any) => {
          this.pages = res;
          console.log(this.pages);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        }
        );
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
