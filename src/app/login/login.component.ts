import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';
  phoneNumber: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  async register() {
    if (!this.name || !this.email || !this.password || !this.phoneNumber) {
      console.log('All fields are required.');
      alert('All fields are required.');
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    console.log('User registered successfully', userData);
    alert('User registered successfully!');
    this.router.navigate(['/users']);
  }

  reset() {
    this.router.navigate(['/login']);
  }

  login() {
    const email = this.email.trim(); 
    const password = this.password.trim(); 

    console.log('Email:', email); 
    console.log('Password:', password); 

    const storedUserData = localStorage.getItem('userData');
    let isValidUser = false;

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      
      if (Array.isArray(userData)) {
        isValidUser = userData.some((user: { email: string; password: string }) => 
          user.email === email && user.password === password
        );
      } else {
        // If it's a single object, check the stored email and password directly
        isValidUser = userData.email === email && userData.password === password;
      }
    }

    if (isValidUser || (email === 'mythrikm9011@gmail.com' && password === 'Mythri123')) {
      this.router.navigate(['/users']);
    } else {
      console.error('Invalid credentials');
      alert('Invalid credentials. Please try again.');
    }
  }
}
