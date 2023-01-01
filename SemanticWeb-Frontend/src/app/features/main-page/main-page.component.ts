import { Component, OnInit } from "@angular/core";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { ChordDiagramComponent } from "../chord-diagram/components/chord-diagram/chord-diagram.component";

@Component({
  standalone: true,
  imports: [MaterialMinModule, MaterialFormModule, ChordDiagramComponent],
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
