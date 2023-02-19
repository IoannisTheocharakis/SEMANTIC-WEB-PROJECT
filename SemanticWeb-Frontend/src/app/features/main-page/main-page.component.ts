import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { TabMenuComponent } from "src/app/shared/standalone-components/tab-menu/tab-menu.component";
import { MainPageChartComponent } from "./main-page-chart/main-page-chart.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { LoaderService } from "src/app/loader/loader.service";
import { Subscription, filter, startWith } from "rxjs";

@Component({
  standalone: true,
  imports: [MainPageChartComponent, InfoCardComponent, TabMenuComponent, RouterOutlet],
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  subscriptions: Subscription = new Subscription();

  color = AppColors.white;
  backgroundColor = AppColors.greenMain;
  constructor(private changeDetector: ChangeDetectorRef, private router: Router) {}
  tab = [
    {
      label: "Database Chart",
      title: "Database Chart",
      path: "/databases/chart",
      icon: "incomplete_circle",
    },
    {
      label: "Database Table",
      title: "Database Table",
      path: "/databases/table",
      icon: "table_chart",
    },
  ];
  ngOnInit() {
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          startWith(this.router)
        )
        .subscribe((event: NavigationEnd) => {
          if (this.router.url === "/databases" || this.router.url === "/") {
            this.router.navigate(["/databases/chart"]);
          }
        })
    );
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
