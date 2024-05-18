import {NgModule} from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {EventsComponent} from './components/events/events.component';
import {AdminGuard} from "./guards/admin.guard";
import {UserComponent} from "./components/user/user.component";
import {UserProfileComponent} from  './components/user-profile/user-profile.component';
import {OrderDetailComponent} from "./components/order-detail/order-detail.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'events', canActivate: mapToCanActivate([AuthGuard]), component: EventsComponent},
  {path: 'profile',canActivate: mapToCanActivate([AuthGuard]), component: UserProfileComponent,children:[
      {path: 'order/:id', canActivate: mapToCanActivate([AuthGuard]), component: OrderDetailComponent},
    ]},
  {path: 'register', component: RegisterComponent},
  {path: 'events', canActivate: mapToCanActivate([AuthGuard]), component: HomeComponent},
  {path: 'event-details/:id', component: EventDetailsComponent},
  {path: 'artists',canActivate: mapToCanActivate([AuthGuard]), component: HomeComponent},
  {path: 'users', canActivate: mapToCanActivate([AdminGuard]), component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
