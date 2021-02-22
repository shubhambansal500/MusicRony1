import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dboard',
  templateUrl: './dboard.component.html',
  styleUrls: ['./dboard.component.scss']
})
export class DboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
 
  }

  OnClick() {
    window.location.href = "https://webexapis.com/v1/authorize?client_id=C54c74df585140a2f64a78e3e8b2ce1f497e71ad794c19c903ba3beba6b14998f&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&scope=spark-admin%3Aworkspaces_write%20meeting%3Arecordings_read%20spark%3Aall%20meeting%3Aschedules_read%20meeting%3Aparticipants_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20spark-admin%3Aworkspaces_read%20meeting%3Aschedules_write%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Acontrols_read%20meeting%3Aparticipants_write&state=set_state_here"
  }
}
