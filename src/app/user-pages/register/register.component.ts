import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { data } from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  static email;
  static firstname;
  static lastname;

  constructor(private authService: SocialAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      if (this.user != null) {
        RegisterComponent.email = user.email;
        RegisterComponent.firstname = user.firstName;
        RegisterComponent.lastname = user.lastName;
        
        console.log(user.firstName)
        console.log(user.lastName)
        console.log(user.email)
      }
    });
  }

    public gender: string; 
    public dob: string; 
    public age: string; 
    public months_of_experience: string; 
    public experience_level: string; 
  signMeUp(): void {
    // var gender = (<HTMLInputElement>document.getElementById("gender")).value; 
    // var dob = (<HTMLInputElement>document.getElementById("dob")).value; 
    // var age = (<HTMLInputElement>document.getElementById("age")).value; 
    // var months_of_experience = (<HTMLInputElement>document.getElementById("months_of_experience")).value; 
    // var experience_level = (<HTMLInputElement>document.getElementById("experience_level")).value; 

      if (this.user != null) {
        let httpData: any;
        let criteria = {
          "email": this.user.email,
          "first_name": this.user.firstName,
          "last_name": this.user.lastName,
          "user_type": "T",
          "gender": this.gender,
          "DOB": this.dob,
          "age": this.age,
          "lock_id": false,
          "months_of_experience": this.months_of_experience,
          "experience_level": this.experience_level,
          instruments: [
            {
              id: "ff71570f-3e87-4bf0-9a69-9762ccaf49eb",
              instrument: "Guitar",
              average_charge_per_session: 500
            }
          ],
          about_the_author: "",
          video_links: [
            "www.abc.com"
          ],
          average_number_of_classes_per_week: 3
        };
        console.log('-------------------inside if before post------------------')
        console.log(criteria)
        this.http.post<any>('https://musicrony.azurewebsites.net/api/registration?code=tOUh6qSxzQ0qh4fvqyJGk1Ca80WKnkSswxPDokJXeRDZaRdCSG7vrw%3D%3D', criteria, {
        }).subscribe(data => {
          httpData = data;
        })
        console.log('--------httpData------------' + httpData)
        console.log('---------------end of if---------------')
      }

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log('------------Google Login------------------')
    console.log(this.authService.authState)
    //this.makePostRequest();
    console.log('---------------after post registration')
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log('------------Facebook Login------------------')
  }

  signOut(): void {
    if (this.user != null) {
      this.authService.signOut(true);
      console.log('-----------------user loggedd out-------------------')
    }
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
