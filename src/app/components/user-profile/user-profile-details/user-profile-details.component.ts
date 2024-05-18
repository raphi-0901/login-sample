import { Component, Input} from '@angular/core';
import {UserDetail} from "../../../dtos/userDtos/user-detail";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrl: './user-profile-details.component.scss'
})
export class UserProfileDetailsComponent{
  @Input() userDetails : UserDetail
  detailForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private userService: UserService, 
    private authService: AuthService, 
    private toastr: ToastrService,
    private router: Router
  ) {
    this.detailForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      streetAndNumber: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      postcode: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }]
      });
  }
  onEdit() {

  }

  public deleteClicked() {
    console.log("Delete user");
    this.userService.deleteUser().subscribe({
      next: () => {
        this.authService.logoutUser();
        console.log("User deleted");
        this.router.navigate(['/']);
        this.toastr.success('Ihr Konto wurde erfolgreich gelöscht.', '');
      },
      error: (error) => {
        console.log("Error while deleting user: ");
        console.error(error);

        let errorMessage: string;

        if (typeof error.error === 'object') {
          errorMessage = error.error.detail;
        } else {
          errorMessage = error.error;
        }

        this.toastr.error(errorMessage, 'Löschen fehlgeschlagen. Wenden Sie sich bitte an den Support.');
      }
    });
  }
}
