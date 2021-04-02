import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  responseDataList = []
  constructor(private analytics: AnalyticsService) { 
    this.responseDataList = analytics.responseDataList;
  }

  ngOnInit(): void {
  }

  revenueChartData = [{
    // TODO fix and remove label tag
    label: 'Rs',
    data: this.responseDataList,
    borderWidth: 1,
    fill: true
  }];

  revenueChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  revenueChartOptions = {};

  revenueChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
    }
  ];

}