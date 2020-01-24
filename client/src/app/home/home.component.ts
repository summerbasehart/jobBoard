import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { PostService } from '../post.service';
import { HomeService } from '../home.service';
import { ApplicantService } from '../applicant.service'

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

  constructor(private api: HomeService, private applicantService: ApplicantService) { }

  selectPost(post) {
    this.selectedPost = post;
    console.log(this.selectedPost);
    
  }

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
