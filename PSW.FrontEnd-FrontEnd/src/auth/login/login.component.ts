import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      const decodeJwt = this.authService.decodeToken(jwt);
      this.authService.user$.next({
        username: decodeJwt.username,
        id: Number(decodeJwt.id),
        role: decodeJwt.role,
      });
    }
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || '',
    };

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: (response) => {
          localStorage.setItem('jwt', response.accessToken);
          console.log(this.authService.user$.value);

          if (this.authService.user$.value.role === 'tourist') {
            this.router.navigate(['/tourist']);
          } else if (this.authService.user$.value.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (this.authService.user$.value.role === 'author') {
            this.router.navigate(['/author']);
          } else if (this.authService.user$.value.role === '') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/']);
          }

          this.snackBar.open('Login successful', 'Close', { duration: 2000 });
          // alert('Login successful');
        },
        error: (err) => {
          this.snackBar.open('Please try again , Login failed', 'Close', {
            duration: 2000,
          });
          // alert('Please try again , Login failed');
        },
      });
    } else {
      this.snackBar.open('Please enter username and password', 'Close', {
        duration: 2000,
      });
      // alert('Please enter username and password');
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
