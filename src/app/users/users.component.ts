import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor() { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    const hardcodedUsers = [
      {
        name: 'Mythri',
        email: 'mythrikm9011@gmail.com',
        phoneNumber: '7760027463',
        password: 'Mythri123',
      },
    ];

    if (userData) {
      const storedUsers = JSON.parse(userData);

      if (Array.isArray(storedUsers)) {
        this.users = [...storedUsers, ...hardcodedUsers];
      } else if (typeof storedUsers === 'object') {
        this.users = [storedUsers, ...hardcodedUsers];
      } else {
        console.warn('Stored user data is neither an array nor an object:', storedUsers);
        this.users = hardcodedUsers;
      }
    } else {
      this.users = hardcodedUsers;
      localStorage.setItem('userData', JSON.stringify(hardcodedUsers));
    }

  }

}
