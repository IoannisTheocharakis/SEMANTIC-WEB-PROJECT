import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { ChordDiagramComponent } from "../chord-diagram/components/chord-diagram/chord-diagram.component";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { IDatabase } from "../chord-diagram/interfaces/database.interface";
import { BehaviorSubject } from "rxjs";
import { TabMenuComponent } from "src/app/shared/standalone-components/tab-menu/tab-menu.component";

@Component({
  standalone: true,
  imports: [
    MaterialMinModule,
    MaterialFormModule,
    ChordDiagramComponent,
    InfoCardComponent,
    TabMenuComponent,
  ],
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
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
