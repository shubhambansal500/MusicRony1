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
      this.fetchSelectedItems()
      this.fetchCheckedIDs()
    });
  }

    public gender: string; 
    public dob: string; 
    public age: string; 
    public monthsOfExperience: string; 
    public experienceLevel: string; 
    public instruments: string;
    public charge: number;

    selectedItemsList = [];
    selectedItemsLabelsList = [];
    checkedIDs = [];

  checkboxesDataList = [
    {
      id: 'C001',
      label: 'Guitar',
      isChecked: false
    },
    {
      id: 'C002',
      label: 'Bass',
      isChecked: false
    },
    {
      id: 'C003',
      label: 'Keyboard',
      isChecked: false
    },
    {
      id: 'C004',
      label: 'Piano',
      isChecked: false
    },
    {
      id: 'C004',
      label: 'Drums',
      isChecked: false
    },
    {
      id: 'C005',
      label: 'Sitar',
      isChecked: false
    },
    {
      id: 'C006',
      label: 'Tabla',
      isChecked: false
    },
    {
      id: 'C007',
      label: 'Flute',
      isChecked: false
    },
    {
      id: 'C008',
      label: 'Violin',
      isChecked: false
    },
    {
      id: 'C009',
      label: 'Music Production',
      isChecked: false
    }
  ]

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  fetchInstruments(){
    this.selectedItemsLabelsList = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.selectedItemsLabelsList.push(value.label);
      }
    });
  }
  signMeUp(): void {
      this.fetchInstruments();
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
          "months_of_experience": this.monthsOfExperience,
          "experience_level": this.experienceLevel,
          instruments: [
            {
              id: "ff71570f-3e87-4bf0-9a69-9762ccaf49eb",
              instrument: this.selectedItemsLabelsList,
              average_charge_per_session: this.charge,
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
        let response = this.http.post<any>('https://musicrony.azurewebsites.net/api/registration?code=8UAbjldUQK82O1D8uJnZyRrbX9fI3IS0Sj1Qav4l7j%2Fo%2FfkcT0NRbw%3D%3D', criteria, {
        }).subscribe(data => {
          httpData = data;
          error => console.log(error)
        })

        
        console.log('--------response------------' + response)
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
