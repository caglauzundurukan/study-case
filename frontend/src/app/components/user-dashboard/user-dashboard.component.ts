import { Component, Input } from '@angular/core';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  @Input() users: User[] = [];

  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  refreshTable(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
