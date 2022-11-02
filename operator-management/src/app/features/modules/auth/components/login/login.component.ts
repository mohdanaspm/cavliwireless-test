import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
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
    return this.loginForm.controls;
  }

  onLogin() {
    this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          let sessionData = {email: this.loginForm.value.email, token: data.token};
          this.authService.setUserSession(sessionData);
          this.isLoading = false;        
          this.router.navigate(['/home/dashboard']);
        },
        error: (err) => {{
          this.isLoading = false;        
          this.loginForm.setErrors({apiError: `${err.error.error.message}!`});
        }}
      });
  }

}
