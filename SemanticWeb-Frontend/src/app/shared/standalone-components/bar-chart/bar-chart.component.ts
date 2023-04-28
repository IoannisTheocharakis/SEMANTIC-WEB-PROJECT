import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxEchartsModule } from "ngx-echarts";
import { Observable, Subscription } from "rxjs";
import { BarChartModel } from "src/app/core/models/charts.model";

@Component({
  standalone: true,
  imports: [NgxEchartsModule],
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit {
  @Input() data$: Observable<BarChartModel[]>;
  subscriptions: Subscription = new Subscription();
  data;
  options: any;
  constructor() {}

  ngOnInit(): void {
    if (this.data$ !== undefined) {
      this.subscriptions.add(
        this.data$.subscribe((data) => {
          this.data = data;
          if (data && data.length !== 0) this.createChart(data);
        })
      );
    }
    this.createChart([]);
    // this.test();
  }

  createChart(myData: BarChartModel[]) {
    let xAxisData = [];
    let dataNames = [];

    let data = [];
    let seriesData = [];
    for (let i = 0; i < myData.length; i++) {
      dataNames.push(myData[i].name);
      // xAxisData.push(myData[i].name);
      data.push(myData[i].value);
      let tmpSeriesData = {
        name: myData[i].name,
        type: "bar",
        data: [data[i]],
        animationDelay: (idx) => idx * 10 + i * 100,
      };
      seriesData.push(tmpSeriesData);
    }
    this.options = {
      legend: {
        data: dataNames,
        align: "left",
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: seriesData,
      animationEasing: "elasticOut",
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
  // test(): void {
  //   const xAxisData = [];
  //   const data1 = [];
  //   const data2 = [];
  //   const data3 = [];

  //   for (let i = 0; i < 100; i++) {

  //   }
  //   xAxisData.push("category" + 2);
  //   xAxisData.push("category" + 2);

  //   xAxisData.push("category" + 2);

  //   data1.push((Math.sin(2 / 5) * (2 / 5 - 10) + 2 / 6) * 5);
  //   data2.push((Math.cos(3 / 5) * (3 / 5 - 10) + 3 / 6) * 5);
  //   data3.push((Math.cos(44 / 5) * (44 / 5 - 10) + 44 / 6) * 5);
  //   this.options = {
  //     legend: {
  //       data: ["bar", "bar22", "bar3"],
  //       align: "left",
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       data: xAxisData,
  //       silent: false,
  //       splitLine: {
  //         show: false,
  //       },
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: "bar",
  //         type: "bar",
  //         data: data1,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: "bar2",
  //         type: "bar",
  //         data: data2,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //       {
  //         name: "bar3",
  //         type: "bar",
  //         data: data3,
  //         animationDelay: (idx) => idx * 10 ,
  //       },
  //     ],
  //     animationEasing: "elasticOut",
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };
  // }
}
