import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from './user';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  private static URL = 'https://doresa.azurewebsites.net/api/registration?code=GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw==';
  postId
  async fetchLogin() {
    try {
      console.log('Entry point for Login API')
      const criteria = {
        "username": "Madhur",
        "password": "IpOr#0987",
        "user_type": "T",
        "retype_password": "IpOr#0987"
      };
      const data = await this.http.get('https://doresa.azurewebsites.net/api/registration?code=GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw==', {observe:"body"});
      //const data = await this.http.get('./xyz.json',  { observe: 'response' });
      //const data = await this.http.get(URL + '/?criteria='+ encodeURIComponent( JSON.stringify(criteria)));
      //const data = this.http.post<any>('https://doresa.azurewebsites.net/api/registration?code=GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw==', criteria).subscribe(data => {
      //   this.postId = data.id;
      // })
      console.log('POST -------------------------')
      console.log(this.postId)
      //const data: any = await this.http.get(LoginService.URL).toPromise();
      console.log(data)
      //console.log(Object.entries(data).forEach(([key, value]) => data[key] = value.trim()))
      return data
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: User[] = [];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.fetchLogin().then((data:any) => {
    this.loginData = data;
    console.log('--------------------inside ngOnInit-------------------');
    console.log(typeof(this.loginData));
    });
  }

}
