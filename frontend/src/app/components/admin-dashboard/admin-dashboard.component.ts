import { Component, Input } from '@angular/core';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from 'src/app/service/auth.service';

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
        this.isUserToUpdate = false;
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
        this.isNewUser = false;
      });
    }
  }

  deleteUser(user: User): void {
    if (user.id) {
      this.userService.deleteUser(user.id).subscribe((user) => {
        console.log("Kullanıcı silindi: ", user);

        this.refreshTable();
      })
    }
  }
}
