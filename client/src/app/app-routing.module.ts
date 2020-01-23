import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { ApplicantAddCOmponent } from'./applicant/applicant-add/applicant-add.component';
import { ApplicantDetailsCOmponent } from'./applicant/applicant-details/applicant-details.component';
import { BycategoryComponent } from './bycategory/bycategory.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: ' Home' }
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { title: ' Admin' }
  },
  {
    path: 'bycategory/:id',
    component: BycategoryComponent,
    data: { title: 'Post by Category' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'Show Post Details' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    component: CategoryComponent,
    data: { title: 'Category' }
  },
  {
    path: 'category/details/:id',
    canActivate: [AuthGuard],
    component: CategoryDetailsComponent,
    data: { title: 'Category Details' }
  },
  {
    path: 'category/add',
    canActivate: [AuthGuard],
    component: CategoryAddComponent,
    data: { title: 'Category Add' }
  },
  {
    path: 'category/edit/:id',
    canActivate: [AuthGuard],
    component: CategoryEditComponent,
    data: { title: 'Category Edit' }
  },
  {
    path: 'post',
    canActivate: [AuthGuard],
    component: PostComponent,
    data: { title: 'Post' }
  },
  {
    path: 'post/details/:id',
    canActivate: [AuthGuard],
    component: PostDetailsComponent,
    data: { title: 'Post Details' }
  },
  {
    path: 'post/add',
    canActivate: [AuthGuard],
    component: PostAddComponent,
    data: { title: 'Post Add' }
  },
  {
    path: 'post/edit/:id',
    canActivate: [AuthGuard],
    component: PostEditComponent,
    data: { title: 'Post Edit' }
  },
  {
    path: 'applicant',
    canActivate: [AuthGuard],
    component: ApplicantComponent,
    data: { title: 'Applicant' }
  },
  {
    path: 'applicant/details/:id',
    canActivate: [AuthGuard],
    component: ApplicantDetailsComponent,
    data: { title: 'Applicant Details' }
  },
  {
    path: 'applicant/add',
    component: ApplicantAddComponent,
    data: { title: 'Applicant Add' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }