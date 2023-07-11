import { Component, Input } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  @Input() users: User[] = [];

  selectedUser: User | undefined = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: 'User'
  };
  isNewUser: boolean = false;
  isUserToUpdate: boolean = false; 
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser(): void {
    this.selectedUser = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      role: 'User'
    };

    this.isNewUser = true;
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };

    this.isUserToUpdate = true;
  }

  updateUser(): void {
     if (this.selectedUser) {
      this.userService.updateUser({
        id: this.selectedUser.id,
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        userName: this.selectedUser.userName,
        password: this.selectedUser.password,
        role: this.selectedUser.role
      }).subscribe((user) => {
        console.log('Kullanıcı güncellendi:', user);
        this.refreshTable();
      });
    }
    this.selectedUser = undefined;
  }

  createUser(): void {
    if (this.selectedUser) {
      this.userService.createUser({
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        userName: this.selectedUser.userName,
        password: this.selectedUser.password,
        role: this.selectedUser.role
      }).subscribe((user) => {
        console.log('Kullanıcı oluşturuldu:', user);
        this.refreshTable();
      });
    }
  }

  deleteUser(user: User): void {
    if (user.id) {
      this.userService.deleteUser(user.id).subscribe((user) => {
        console.log('Kullanıcı silindi:', user);
        this.refreshTable();
      });
    }
  }
}
