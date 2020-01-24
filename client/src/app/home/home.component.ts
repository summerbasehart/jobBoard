import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { NgModule }                     from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { PostService } from '../post.service';
import { HomeService } from '../home.service';
import { QuestionService } from '../question.service';
import { DynamicFormComponent }         from '../dynamicForm/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../dynamicForm/dynamic-form-question.component';

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule ],
  declarations: [ DynamicFormComponent, DynamicFormQuestionComponent ],
  bootstrap: [  ]
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:  [QuestionService]
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
  questions: any[];

  constructor(private api: HomeService, service: QuestionService) { 
    this.questions = service.getQuestions();
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
