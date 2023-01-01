import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from "@angular/core";
import { DatabaseData } from "../../data/database.data";
import { ChordDiagramViewModel } from "../../view-models/chord-diagram.viewmodel";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { DatabasesComponent } from "../databases/databases.component";

@Component({
  standalone: true,
  imports: [MaterialMinModule, DatabasesComponent],
  selector: "app-chord-diagram",
  templateUrl: "./chord-diagram.component.html",
  styleUrls: ["./chord-diagram.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChordDiagramComponent {
  public chordDiagramVm: ChordDiagramViewModel;

  constructor() {
    this.chordDiagramVm = new ChordDiagramViewModel(
      DatabaseData.matrix, //pinakas nxn stoixeia
      230, // megethos tou kuklo (aktina)
      DatabaseData.groups // kathgories pou uparxoun(onomata database)
    );
  }
}
