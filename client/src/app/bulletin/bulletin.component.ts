import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { BulletinService } from '../bulletin.service';
import { BlogService } from '../blog.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
  blog : Blog = {
    id: '',
    blogTitle: '',
    blogImgUrl: '',
    blogAuthor: '',
    blogContent: '',
    blogPs: '',
    updated: null
  };
  isLoadingResults = true;
  blogs: Blog[] = [];
  // sortedBlogs = this.blogs.slice().sort((a, b) => b.updated - a.updated)

  constructor(private api: BulletinService, private blogService: BlogService) { }


    ngOnInit() {
      this.blogService.getBlogs()
        .subscribe((res: any) => {
          this.blogs = res;
          console.log(this.blogs);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        }
        );
    }

  }
