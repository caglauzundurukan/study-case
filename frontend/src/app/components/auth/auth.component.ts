import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginPageComponent {
  username!: string;
  password!: string;
  role!: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged().then((isLogged) => {
      if (isLogged) {
        if (this.authService.getRole() == 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        }else if (this.authService.getRole() == 'User') {
          this.router.navigate(['/user-dashboard']);
        }
      }
    })
  }

  login() {
    this.authService.login(this.username, this.password).add(() => {
      this.authService.isLogged().then((isLogged) => {
        if (isLogged) {
          console.log('Logged in successfully as '+ this.authService.getRole());

          if (this.authService.getRole() == 'Admin') {
            this.router.navigate(['/admin-dashboard']);
          }else if (this.authService.getRole() == 'User') {
            this.router.navigate(['/user-dashboard']);
          }
        }
      })
    });
  }
}
