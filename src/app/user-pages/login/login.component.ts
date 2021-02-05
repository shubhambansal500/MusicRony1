import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';

@Injectable()

// export class LoginService {
//   constructor(private http: HttpClient) { }

//   private static URL = 'https://musicrony.azurewebsites.net/api/registration?code=tOUh6qSxzQ0qh4fvqyJGk1Ca80WKnkSswxPDokJXeRDZaRdCSG7vrw%3D%3D';
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
//       return this.http.post('https://musicrony.azurewebsites.net/api/registration', criteria, {
//         params: {
//           code: "tOUh6qSxzQ0qh4fvqyJGk1Ca80WKnkSswxPDokJXeRDZaRdCSG7vrw%3D%3D"
//         }
//       });
//       //const data = await this.http.get('./test.json').subscribe();
//       //const data = this.http.post<any>('https://musicrony.azurewebsites.net/api/registration?code=tOUh6qSxzQ0qh4fvqyJGk1Ca80WKnkSswxPDokJXeRDZaRdCSG7vrw%3D%3D', criteria).subscribe(data => {
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
    this.http.post<User>('https://musicrony.azurewebsites.net/api/registration', this.criteria, {
        params: {
          code: "tOUh6qSxzQ0qh4fvqyJGk1Ca80WKnkSswxPDokJXeRDZaRdCSG7vrw%3D%3D"
        }
      }).subscribe(data => {
      this.httpData=data;
    })
  }
}
