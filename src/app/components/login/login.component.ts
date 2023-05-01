import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-solid fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Token: ' + this.authService.getToken());
    console.log('IsLogedIn la inceput: ' + this.authService.isLoggedIn());
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hiddenPassord() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeIcon = 'fa-solid fa-eye')
      : (this.eyeIcon = 'fa-solid fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  login(loginForm: FormGroup) {
    return this.authService.login(loginForm.value).subscribe({
      next: (resp: any) => {
        this.router.navigate(['home']);
        this.authService.storeToken(resp.token);
        console.log('Get Token: ' + this.authService.getToken());
        console.log('Is LogedIn dupa ' + this.authService.isLoggedIn());
      },
      error: (error) => {
        const errorMessage = error.error.message;
        console.log(errorMessage);
        this.openSnackBar(errorMessage, '');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = ['snackBarPanelClass'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this._snackBar.open(message, action, config);
  }
}
