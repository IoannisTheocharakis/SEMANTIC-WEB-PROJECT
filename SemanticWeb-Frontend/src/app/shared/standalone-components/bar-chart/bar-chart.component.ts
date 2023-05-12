import { Component, Input, OnInit } from "@angular/core";
import { NgxEchartsModule } from "ngx-echarts";
import { Observable, Subscription } from "rxjs";
import { BarChartModel } from "src/app/core/models/charts.model";
import { ThemeServiceService } from "src/app/core/services/themeService.service";

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
  constructor(public themeService: ThemeServiceService) {}

  ngOnInit(): void {
    if (this.data$ !== undefined) {
      this.subscriptions.add(
        this.data$.subscribe((data) => {
          this.data = data;
          if (data && data.length !== 0) this.createChart(data);
        })
      );
    } else {
      this.createChart([]);
    }
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
        textStyle: {
          color: "black",
        },
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

    this.themeService.themeColor$.subscribe((data) => {
      if (data === "theme-dark") {
        this.options.legend = { ...this.options.legend, textStyle: { color: "" } };
        this.options.legend.textStyle.color = "white";
      } else {

        this.options.legend = { ...this.options.legend, textStyle: { color: "" } };
        this.options.legend.textStyle.color = "black";
      }
      this.options = { ...this.options };
    });
  }
}
