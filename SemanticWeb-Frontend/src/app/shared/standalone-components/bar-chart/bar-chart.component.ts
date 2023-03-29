import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  standalone: true,
  imports: [ BrowserAnimationsModule],
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent {
  data: any[] = [
    {
      name: "Germany",
      value: 8940000,
    },
    {
      name: "USA",
      value: 5000000,
    },
    {
      name: "France",
      value: 7200000,
    },
  ];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  constructor() {}

  onSelect(event) {
    console.log(event);
  }
}
