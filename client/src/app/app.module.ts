import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from './_alert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';
import { ApplicantComponent } from './applicant/applicant.component'
import { ContractorComponent } from './contractor/contractor.component'
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { ApplicantAddComponent } from './applicant/applicant-add/applicant-add.component';
import { ApplicantDetailsComponent } from './applicant/applicant-details/applicant-details.component';
import { ContractorAddComponent } from './contractor/contractor-add/contractor-add.component';
import { ContractorDetailsComponent } from './contractor/contractor-details/contractor-details.component'
import { PageComponent } from './page/page.component';
import { PageAddComponent } from './page/page-add/page-add.component';
import { PageDetailsComponent } from './page/page-details/page-details.component';
import { PageEditComponent } from './page/page-edit/page-edit.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatMenuModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatGridListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatContenteditableModule } from 'mat-contenteditable';
import { AdminComponent } from './admin/admin.component';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';
import { BlogComponent } from './blog/blog.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoryComponent,
    PostComponent,
    ApplicantComponent,
    ContractorComponent,
    CategoryDetailsComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    PostDetailsComponent,
    PostAddComponent,
    PostEditComponent,
    AdminComponent,
    ApplicantAddComponent,
    ApplicantDetailsComponent,
    ContractorAddComponent,
    ContractorDetailsComponent,
    PageComponent,
    PageEditComponent,
    PageAddComponent,
    PageDetailsComponent,
    BlogComponent,
    BlogAddComponent,
    BlogEditComponent,
    BlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    CKEditorModule,
    MatContenteditableModule,
    AlertModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }