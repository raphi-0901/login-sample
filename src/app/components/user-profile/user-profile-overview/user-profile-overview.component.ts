import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserDetail} from "../../../dtos/userDtos/user-detail";
import {Message} from "../../../dtos/message";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-profile-overview',
  templateUrl: './user-profile-overview.component.html',
  styleUrl: './user-profile-overview.component.scss'
})
export class UserProfileOverviewComponent implements OnChanges{
  @Input() userDetail: UserDetail;
  @Input() news: Message[];

  constructor(private router : Router) {

  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes)
    console.log(this.userDetail.shortOrderDtos)
  }


}
