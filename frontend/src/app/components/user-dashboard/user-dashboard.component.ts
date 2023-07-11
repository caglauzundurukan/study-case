import { Component, Input } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  @Input() users: User[] = [];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
