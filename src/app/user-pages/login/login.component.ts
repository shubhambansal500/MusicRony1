import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent{
  httpData: any;
  criteria = {
    "username": "Madhur",
    "password": "IpOr#0987",
    "user_type": "T",
    "retype_password": "IpOr#0987",
    "create": false
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }
}
