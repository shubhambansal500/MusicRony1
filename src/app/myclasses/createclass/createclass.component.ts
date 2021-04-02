import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.scss']
})
export class CreateclassComponent implements OnInit {

  constructor(private http: HttpClient) { }
  checkboxesInstrumentDataList = []
  instrumentsResponse: any;
  ngOnInit(): void {
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
  }
}
