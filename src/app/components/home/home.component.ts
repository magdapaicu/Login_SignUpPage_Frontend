import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe((resp) => {
      this.users = resp;
      console.log(this.users);
    });
  }
}
