import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { BehaviorSubject } from "rxjs";
import { ChordDiagramComponent } from "../../chord-diagram/components/chord-diagram/chord-diagram.component";
import { IDatabase } from "../../chord-diagram/interfaces/database.interface";

@Component({
  standalone: true,
  imports: [MaterialMinModule, ChordDiagramComponent, InfoCardComponent],
  selector: "app-main-page-chart",
  templateUrl: "./main-page-chart.component.html",
  styleUrls: ["./main-page-chart.component.scss"],
})
export class MainPageChartComponent implements OnInit {
  color = AppColors.white;
  backgroundColor = AppColors.greenMain;
  datasetsInfoStats$: BehaviorSubject<IDatabase[]> = new BehaviorSubject([]);

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  setDatasetsInfoStats(event: IDatabase[]) {
    this.datasetsInfoStats$.next(event);
  }
}
