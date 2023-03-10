import { Component } from "@angular/core";
import { ThemeServiceService } from "./core/services/themeService.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss", "./dark-theme.scss", "./light-theme.scss"],
})
export class AppComponent {
  title = "SemanticWeb";
  themeColor: string;
  constructor(public themeService: ThemeServiceService) {}
}
