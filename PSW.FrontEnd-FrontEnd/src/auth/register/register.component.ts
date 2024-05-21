import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Registration } from '../model/registration.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    role: new FormControl(''),
    interest: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    const registration: Registration = {
      username: this.registrationForm.value.username || '',
      password: this.registrationForm.value.password || '',
      email: this.registrationForm.value.email || '',
      name: this.registrationForm.value.name || '',
      surname: this.registrationForm.value.surname || '',
      role: Number(this.registrationForm.value.role),
      interest: Number(this.registrationForm.value.interest),
    };

    console.log(registration);

    if (this.registrationForm.valid) {
      this.authService.register(registration).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.snackBar.open('Registration successful', 'Close', {
            duration: 2000,
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      console.log(registration);
      this.snackBar.open('Registration failed', 'Close', { duration: 2000 });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
