import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { Page } from '../page/page';
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
    postDescription: '',
    postQualifications: '',
    postReference: '',
    updated: null
  };
  posts: Post[] = [];
  isLoadingResults = true;
  selectedPost: Post = null;
  page: Page[] = [];

  constructor(private api: HomeService) { }

  selectPost(post) {
    this.selectedPost = post;
    console.log(this.selectedPost);
  }

  header(id:"5e3454e49b5bb90378723d41") {
      this.api.getPage(id)
        .subscribe((data: any) => {
          this.page = data;
          console.log(this.post);
          this.isLoadingResults = false;
        });
    }

  emp(id: "5e34554f9b5bb90378723d43") {
    this.api.getPage(id)
      .subscribe((emp: any) => {
        this.page = emp;
        console.log(this.page);
        this.isLoadingResults = false;
      });
  }

  con(id: "5e3455999b5bb90378723d44") {
    this.api.getPage(id)
      .subscribe((con: any) => {
        this.page = con;
        console.log(this.page);
        this.isLoadingResults = false;
      });
  }

    ngOnInit() {
      this.api.getPages()
        .subscribe((res: any) => {
          this.page = res;
          console.log(this.page);
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
