import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../dtos/userDtos/order";
import {Ticket} from "../../../dtos/userDtos/Ticket";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-profile-orders',
  templateUrl: './user-profile-orders.component.html',
  styleUrl: './user-profile-orders.component.scss'
})
export class UserProfileOrdersComponent implements OnInit{

  constructor(private userService : UserService) {
  }

  ngOnInit() {
    //TODO: finish orders
    this.userService.getOrder()
  }

}
