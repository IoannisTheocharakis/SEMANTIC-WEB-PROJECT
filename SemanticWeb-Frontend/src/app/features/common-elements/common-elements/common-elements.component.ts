import { Component, OnInit } from "@angular/core";
import { CommonElementsFormComponent } from "../common-elements-form/common-elements-form.component";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";

@Component({
  standalone: true,
  imports: [CommonElementsFormComponent, InfoCardComponent],
  selector: "app-common-elements",
  templateUrl: "./common-elements.component.html",
  styleUrls: ["./common-elements.component.scss"],
})
export class CommonElementsComponent implements OnInit {
  localStorage: Storage = window.localStorage;
  color = AppColors.white;
  backgroundColorDark = AppColors.greenMain;
  backgroundColorLight = AppColors.greenMainLight;
  constructor() {}

  ngOnInit() {}
}
