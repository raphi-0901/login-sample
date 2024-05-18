import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../dtos/register-request";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  host: {
    class: 'bg-background grid place-items-center my-8'
  }
})
export class RegisterComponent {
  registerForm: UntypedFormGroup;
  // After first submission attempt, form validation will start
  submitted = false;
  // Error flag
  error = false;
  errorMessage = '';

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]],
      agb: [false, [Validators.requiredTrue]]
    });
  }

  /**
   * Form validation will start after the method is called, additionally an AuthRequest will be sent
   */
  onRegister() {
    this.submitted = true;
    console.log('Registering user', this.registerForm);
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = new RegisterRequest(
        this.registerForm.controls.name.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value
      );
      this.registerUser(registerRequest);
    } else {
      console.log('Invalid input');
    }
  }

  /**
   * Send authentication data to the authService. If the authentication was successfully, the user will be forwarded to the message page
   *
   * @param registerRequest authentication data from the user login form
   */
  registerUser(registerRequest: RegisterRequest) {
    console.log('Try to register user: ' + registerRequest.name);
    this.authService.registerUser(registerRequest).subscribe({
      next: () => {
        console.log('Successfully registered user: ' + registerRequest.name);
        this.router.navigate(['/']);
      },
      error: error => {
        console.log('Could not log in due to:');
        console.log(error);
        this.error = true;
        if (typeof error.error === 'object') {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = error.error;
        }

        this.toastr.error(this.errorMessage, 'Registration failed!')
      }
    });
  }

  /**
   * Error flag will be deactivated, which clears the error message
   */
  vanishError() {
    this.error = false;
  }

  ngOnInit() {
  }
}
