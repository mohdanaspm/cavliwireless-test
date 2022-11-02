import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ]
        ]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSignup() {
    this.isLoading = true;
    this.authService.signup(this.signupForm.value).subscribe({
      next: (data) => {
        this.isLoading = true;
        this.openSnackBar('Sign up is successful. Please login.')
        this.router.navigate(['auth/signin']);
      },
      error: (err) => {{
        this.isLoading = false;        
        this.signupForm.setErrors({apiError: `${err.error.error}!`});
      }}
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
