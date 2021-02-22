import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      if(this.user != null){
        console.log(user.firstName)
        console.log(user.lastName)
        console.log(user.email)
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log('------------Google Login------------------')
    console.log(this.authService.authState)
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log('------------Facebook Login------------------')
  }

  signOut(): void {
    if(this.user != null){
      this.authService.signOut(true);
      console.log('-----------------user loggedd out-------------------')
    }
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
