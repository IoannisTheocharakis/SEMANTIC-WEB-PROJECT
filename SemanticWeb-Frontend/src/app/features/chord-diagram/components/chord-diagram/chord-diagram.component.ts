import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { ChordDiagramViewModel } from "../../view-models/chord-diagram.viewmodel";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { DatabasesComponent } from "../databases/databases.component";
import { Subscription } from "rxjs";
import { CoreService } from "src/app/core/services/core.service";
import { Dataset } from "src/app/core/models/dataset.model";
import { IDatabase } from "../../interfaces/database.interface";
import { SpinnerComponent } from "src/app/shared/standalone-components/spinner/spinner.component";
import { LoaderService } from "src/app/loader/loader.service";
@Component({
  standalone: true,
  imports: [MaterialMinModule, DatabasesComponent, SpinnerComponent],
  selector: "app-chord-diagram",
  templateUrl: "./chord-diagram.component.html",
  styleUrls: ["./chord-diagram.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChordDiagramComponent {
  @Output() eventDatasets = new EventEmitter<IDatabase[]>();
  public chordDiagramVm: ChordDiagramViewModel;
  subscriptions: Subscription = new Subscription();
  datasetsStats: number[][] = [];
  datasetsInfoStats: IDatabase[] = [];
  letters = "0123456789ABCDEF";
  constructor(private coreService: CoreService, public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.coreService.datasets$.subscribe((data) => {
        if (data != null && data.length !== 0) {
          this.createCircleData(data);
          this.createTitleOfCircle(data);
          this.generateCircle(this.datasetsStats, this.datasetsInfoStats);
          this.eventDatasets.emit(this.datasetsInfoStats);
        }
      })
    );
  }
  createCircleData(datasets: Dataset[]) {
    for (let i = 0; i < datasets.length; i++) {
      let arrayOfDatabase: number[] = [];
      for (let j = 0; j < datasets.length; j++) {
        if (i === j) {
          arrayOfDatabase.push(+datasets[j].triples);
        } else {
          arrayOfDatabase.push(0);
        }
      }
      this.datasetsStats.push(arrayOfDatabase);
    }
  }
  createTitleOfCircle(datasets: Dataset[]) {
    for (let i = 0; i < datasets.length; i++) {
      let databaseInfo: IDatabase = {} as IDatabase;
      databaseInfo.title = datasets[i].title;
      databaseInfo.id = datasets[i].id;
      databaseInfo.endpoint = datasets[i].endpoint;
      databaseInfo.triples = +datasets[i].triples;
      databaseInfo.colour = this.getRandomColor();
      this.datasetsInfoStats.push(databaseInfo);
    }
  }
  getRandomColor(): string {
    let color = "#"; // <-----------
    for (var i = 0; i < 6; i++) {
      color += this.letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  generateCircle(matrix: number[][], groups: IDatabase[]) {
    this.chordDiagramVm = new ChordDiagramViewModel(
      matrix, //pinakas nxn stoixeia
      230, // megethos tou kuklo (aktina)
      groups // kathgories pou uparxoun(onomata database)
    );
  }
  seeDetails(datasetHref: string) {
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
