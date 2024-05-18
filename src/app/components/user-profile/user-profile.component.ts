import {Component, OnInit} from '@angular/core';
import {UserDetail} from "../../dtos/userDtos/user-detail";
import {Salutation} from "../../dtos/userDtos/salutation";
import {UserAddress} from "../../dtos/userDtos/user-address";
import {Order} from "../../dtos/userDtos/order";
import {Message} from "../../dtos/message";
import {Ticket} from "../../dtos/userDtos/Ticket";
import {UserService} from "../../services/user.service";
import {ShortOrderDtos} from "../../dtos/userDtos/ShortOrderDtos";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit{

  userDetails: UserDetail = new UserDetail("","","",undefined,undefined);
  orders: Order[];
  news: Message[];
  currentComponent: string = 'UserProfileOverview';

  constructor(private userService: UserService) {
  }

  ngOnInit():void{
    this.userService.getProfile().subscribe({
      next:(response)=>{
        this.userDetails = response;
      },
      error:()=>{

      }
    });
  }


  switchToComponent(component: string) {
    this.currentComponent = component;
  }

}
