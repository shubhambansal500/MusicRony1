import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  revenueChartData = [{
    // TODO fix and remove label tag
    label: 'Rs',
    data: [10, 100, 3, 5, 2, 3],
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