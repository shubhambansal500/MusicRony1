import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  private email: string;
  private firstname: string;
  private lastname: string;
  private gender: string;
  private dob: string;
  private monthsOfExperience: string;
  private experienceLevel: string;
  private charge: number;
  private selectedItemsList = [];
  private selectedItemsInstrumentsList = [];
  private selectedItemsInstrumentsListId = [];
  private checkedIDs = [];

  checkboxesInstrumentDataList = []
  instrumentsResponse: any;

  constructor(private authService: SocialAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      if (this.user != null) {
        this.email = user.email;
        this.firstname = user.firstName;
        this.lastname = user.lastName;
      }
    });
    this.fetchInstrumentsfromAPI()
  }

  async fetchInstrumentsfromAPI() {
    await this.http.get('https://musicrony.azurewebsites.net/api/instruments?code=hWieGj0aBSLxue2eJakA4YUCVdc6ijCtJPALF10qgnNSWdNq1O0uiQ%3D%3D', { responseType: 'json' })
      .subscribe(instruments => {
        this.instrumentsResponse = instruments;
        this.instrumentsResponse.forEach(data => {
          this.checkboxesInstrumentDataList.push({
            instrument: data.instrument,
            id: data.id,
            _rid: data._rid,
            _self: data._self,
            _etag: data._etag,
            _attachments: data._attachments,
            _ts: data._ts,
            isChecked: false
          });
        });
      });
    this.fetchInstruments();
  }

  public ageFromDateOfBirthday(dateOfBirth: any): string {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age.toString();
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesInstrumentDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchInstruments() {
    this.selectedItemsInstrumentsList = []
    this.checkboxesInstrumentDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.selectedItemsInstrumentsList.push(value.instrument);
        this.selectedItemsInstrumentsListId.push(value.id);
      }
    });
  }
  signMeUp(): void {
    let age: string = this.ageFromDateOfBirthday(this.dob)
    if (this.user != null) {
      let httpData: any;
      let criteria = {
        "email": this.email,
        "first_name": this.firstname,
        "last_name": this.lastname,
        "user_type": "T",
        "gender": this.gender,
        "DOB": this.dob,
        "age": age,
        "lock_id": false,
        "months_of_experience": this.monthsOfExperience,
        "experience_level": this.experienceLevel,
        instruments: [
          {
            id: this.selectedItemsInstrumentsListId,
            instrument: this.selectedItemsInstrumentsList,
            average_charge_per_session: this.charge,
          }
        ],
        about_the_author: "",
        video_links: [
          "www.abc.com"
        ],
        average_number_of_classes_per_week: 3
      };
      let response = this.http.post<any>('https://musicrony.azurewebsites.net/api/registration?code=8UAbjldUQK82O1D8uJnZyRrbX9fI3IS0Sj1Qav4l7j%2Fo%2FfkcT0NRbw%3D%3D', criteria, {
        responseType: "json"
      }).subscribe(data => {
        httpData = data;
        error => console.log(error)
      })
      console.log(response)
    }

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if (this.user != null) {
      this.authService.signOut(true);
    }
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
