import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {UserComponent} from './components/user/user.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {httpInterceptorProviders} from './interceptors';
import {EventsComponent} from './components/events/events.component';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {PaginatorComponent} from "./components/paginator/paginator.component";

import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {UserProfileDetailsComponent} from "./components/user-profile/user-profile-details/user-profile-details.component";
import {UserProfileOverviewComponent} from "./components/user-profile/user-profile-overview/user-profile-overview.component";
import {UserProfileOrdersComponent} from "./components/user-profile/user-profile-orders/user-profile-orders.component";
import {OrderDetailComponent} from "./components/order-detail/order-detail.component";
import {DeleteModalComponent} from './components/delete-modal/delete-modal.component';
import {ModalComponent} from "./components/modal/modal.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {SeatSelectionComponent} from "./components/seat-selection/seat-selection.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    EventsComponent,
    UserProfileComponent,
    UserProfileOverviewComponent,
    UserProfileDetailsComponent,
    UserProfileOrdersComponent,
    RegisterComponent,
    PaginatorComponent,
    OrderDetailComponent,
    DeleteModalComponent,
    ModalComponent,
    EventDetailsComponent,
    SeatSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 4,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
