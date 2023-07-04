import { Component, Input, OnInit } from "@angular/core";
import { NgxEchartsModule, ThemeOption } from "ngx-echarts";
import { Observable, Subscription } from "rxjs";
import { BarChartModel } from "src/app/core/models/charts.model";
import type { EChartsOption } from "echarts";
import { ThemeServiceService } from "src/app/core/services/themeService.service";

@Component({
  standalone: true,
  imports: [NgxEchartsModule],
  selector: "app-rose-diagram",
  templateUrl: "./rose-diagram.component.html",
  styleUrls: ["./rose-diagram.component.scss"],
})
export class RoseDiagramComponent implements OnInit {
  @Input() data$: Observable<BarChartModel[]>;
  subscriptions: Subscription = new Subscription();
  data;
  theme: string | ThemeOption = undefined;
  options: EChartsOption;
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
    // this.test();
  }
  createChart(myData: BarChartModel[]) {
    let dataNames = [];
    let data = [];
    for (let i = 0; i < myData.length; i++) {
      dataNames.push(myData[i].name);
      let tmpData = { value: myData[i].value, name: myData[i].name };
      data.push(tmpData);
    }

    this.options = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        align: "auto",
        bottom: 0,
        data: dataNames,
        textStyle: {
          color: "black",
        },
      },
      calculable: true,
      series: [
        {
          name: "area",
          type: "pie",
          radius: [30, 110],
          roseType: "area",
          data: data,
          label: {
            color: "black",
          },
        },
      ],
    };
    this.themeService.themeColor$.subscribe((data) => {
      if (data === "theme-dark") {
        this.options.series[0].label.color = "white";
        this.options.legend = { ...this.options.legend, textStyle: { color: "" } };
        this.options.legend.textStyle.color = "white";
      } else {
        this.options.series[0].label.color = "black";
        this.options.legend = { ...this.options.legend, textStyle: { color: "" } };
        this.options.legend.textStyle.color = "black";
      }
      this.options = { ...this.options };
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
