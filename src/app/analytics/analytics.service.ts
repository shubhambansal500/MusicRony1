import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AnalyticsService {
    protected getDataForAnalytics = "http://myapi"
    private _responseDataList = [10, 100, 3, 5, 2, 3];
    public get responseDataList() {
        return this._responseDataList;
    }
    public set responseDataList(value) {
        this._responseDataList = value;
    }

    constructor(protected http: HttpClient) { 
        
    }

    async fetchAnalyticsData() {
        // implement rest from registration
            return this.responseDataList
    }
}