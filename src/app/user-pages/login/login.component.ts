import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';

@Injectable()

// export class LoginService {
//   constructor(private http: HttpClient) { }

//   private static URL = 'https://doresa.azurewebsites.net/api/registration?code=GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw==';
//   async fetchLogin() {
//     try {
//       console.log('Entry point for Login API')
//       const criteria = {
//         "username": "Madhur",
//         "password": "IpOr#0987",
//         "user_type": "T",
//         "retype_password": "IpOr#0987",
//         "create": false
//       };
//       return this.http.post('https://doresa.azurewebsites.net/api/registration', criteria, {
//         params: {
//           code: "GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw=="
//         }
//       });
//       //const data = await this.http.get('./test.json').subscribe();
//       //const data = this.http.post<any>('https://doresa.azurewebsites.net/api/registration?code=GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw==', criteria).subscribe(data => {
//       //   this.postId = data.id;
//       // })
//       //const data: any = await this.http.get(LoginService.URL).toPromise();
//       //console.log(Object.entries(data).forEach(([key, value]) => data[key] = value.trim()))
//     } catch (error) {
//       console.error(`Error occurred: ${error}`);
//     }
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //providers: [LoginService],
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
    this.http.post<User>('https://doresa.azurewebsites.net/api/registration', this.criteria, {
        params: {
          code: "GnJBNGLZkaC6H7lguuqr2e3P3TvJy5Kgux9TXu3tx7uLe21rFOmsYw=="
        }
      }).subscribe(data => {
      this.httpData=data;
    })
  }
}
