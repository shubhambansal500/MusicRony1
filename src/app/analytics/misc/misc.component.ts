import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  areaChartData = [{
    // TODO fix and remove label tag
    label: 'Rs',
    data: [10, 100, 3, 5, 2, 3],
    borderWidth: 1,
    fill: true
  }];

  areaChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
    }
  ];

}