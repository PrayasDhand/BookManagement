import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { provideToastr } from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA  } from "@angular/core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LibraryComponent } from './library/library.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { BookCategoriesComponent } from './book-categories/book-categories.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { SideNav1Component } from './side-nav1/side-nav1.component';
@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideNavComponent,
    LibraryComponent,
    RegisterComponent,
    LoginComponent,
    OrderComponent,
    OrdersComponent,
    ReturnBookComponent,
    UsersListComponent,
    ManageBooksComponent,
    BookCategoriesComponent,
    ManageCategoriesComponent,
    ProfileComponent,
    DashboardComponent,
    SideNav1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:5140'],
      },
    }),
  ],
  providers: [provideAnimations()],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
