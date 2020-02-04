import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { CategoryComponent } from './category/category.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component'
import { ApplicantComponent } from './applicant/applicant.component';
import { ContractorComponent } from './contractor/contractor.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { PageDetailsComponent } from './page/page-details/page-details.component';
import { PageAddComponent } from './page/page-add/page-add.component';
import { PageEditComponent } from './page/page-edit/page-edit.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { ContractorAddComponent } from'./contractor/contractor-add/contractor-add.component';
import { ContractorDetailsComponent } from'./contractor/contractor-details/contractor-details.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ApplicantAddComponent } from'./applicant/applicant-add/applicant-add.component';
import { ApplicantDetailsComponent } from'./applicant/applicant-details/applicant-details.component';


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
    path: 'bulletin',
    component: BulletinComponent,
    data: { title: ' Bulletin' }
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { title: ' Admin' }
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
  {
    path: 'contractor',
    canActivate: [AuthGuard],
    component: ContractorComponent,
    data: { title: 'Contractor' }
  },
  {
    path: 'contractor/details/:id',
    canActivate: [AuthGuard],
    component: ContractorDetailsComponent,
    data: { title: 'Contractor Details' }
  },
  {
    path: 'contractor/add',
    component: ContractorAddComponent,
    data: { title: 'Contractor Add' }
  },
  {
    path: 'page',
    canActivate: [AuthGuard],
    component: PageComponent,
    data: { title: 'Page' }
  },
  {
    path: 'page/details/:id',
    component: PageDetailsComponent,
    data: { title: 'Page Details' }
  },
  {
    path: 'page/add',
    canActivate: [AuthGuard],
    component: PageAddComponent,
    data: { title: 'Page Add' }
  },
  {
    path: 'page/edit/:id',
    canActivate: [AuthGuard],
    component: PageEditComponent,
    data: { title: 'Page Edit' }
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: { title: 'Blog' }
  },
  {
    path: 'blog/details/:id',
    component: BlogDetailsComponent,
    data: { title: 'Blog Details' }
  },
  {
    path: 'blog/add',
    canActivate: [AuthGuard],
    component: BlogAddComponent,
    data: { title: 'Blog Add' }
  },
  {
    path: 'blog/edit/:id',
    canActivate: [AuthGuard],
    component: BlogEditComponent,
    data: { title: 'Blog Edit' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }