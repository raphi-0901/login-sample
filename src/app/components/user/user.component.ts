import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {BlockUserRequest, BlockUserResponse, SimpleUserDto, UserSearchDto, UserSearchPageDto} from "../../dtos/user";
import {ModalComponent} from '../modal/modal.component';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

enum ACTION {
  BLOCK,
  UNBLOCK
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(ModalComponent) childComponent: ModalComponent;

  searchParams: UserSearchDto = {
    pageSize: 25,
    page: 0,
    orderAsc: true
  };
  data: UserSearchPageDto;
  selectedUser: SimpleUserDto | undefined
  action: ACTION | undefined

  constructor(public userService: UserService, public authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.search(this.searchParams).subscribe((response: UserSearchPageDto) => {
      this.data = response;
    });
  }

  blockUser() {
    const requestBody: BlockUserRequest = { email: this.selectedUser.email };
    this.userService.blockUser(requestBody).subscribe({
        next: (response: BlockUserResponse) => {
          this.data.users = this.data.users.map(user => {
            if (user.email === response.email) {
              return response
            }
            return user;
          })
          this.toastr.success( `${response.email} successfully blocked!`);
        },
        error: error => {
          let errorMessage = ''
          if (typeof error.error === 'object') {
            errorMessage = error.error.error;
          } else {
            errorMessage = error.error;
          }
          this.toastr.error(errorMessage, 'Blocking user did not work!');
        }
      }
    );
    this.childComponent.close()
  }

  unblockUser() {
    const requestBody: BlockUserRequest = { email: this.selectedUser.email };
    this.userService.unblockUser(requestBody).subscribe({
        next: (response: BlockUserResponse) => {
          this.data.users = this.data.users.map(user => {
            if (user.email === response.email) {
              return response
            }
            return user;
          })
          this.toastr.success( `${response.email} successfully unblocked!`);
        },
        error: error => {
          let errorMessage = ''
          if (typeof error.error === 'object') {
            errorMessage = error.error.error;
          } else {
            errorMessage = error.error;
          }
          this.toastr.error(errorMessage, 'Unblocking user did not work!');
        }
      }
    );
    this.childComponent.close()
  }

  openModal(user: SimpleUserDto, action: ACTION) {
    this.action = action
    this.selectedUser = user;
    this.childComponent.open();
  }

  onCloseModal() {
    this.selectedUser = null;
    this.action = null
  }

  searchUsers(params) {
    this.searchParams.page = params.page - 1;
    this.searchParams.pageSize = params.pageSize;
    this.searchParams.orderAsc = !params.desc;
    if (params.sort) {
      this.searchParams.sort = params.sort;
    }
    this.searchParams.searchString = params.query;
    this.userService.search(this.searchParams).subscribe((response: any) => {
      this.data = response;
    });
  }

  protected readonly close = close;
  protected readonly ACTION = ACTION;
}
