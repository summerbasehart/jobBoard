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
  selectedPost: Post = null;

  constructor(private api: HomeService) { }

  openLink(evt, animName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("job");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(animName).style.display = "block";
    evt.currentTarget.className += " w3-red";
  }

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
