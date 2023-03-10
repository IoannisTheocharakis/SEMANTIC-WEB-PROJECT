import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeServiceService {
  private themeColorSubject$: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem("theme-color")
  );
  themeColor$ = this.themeColorSubject$.asObservable();
  setTheme(): void {
    if (localStorage.getItem("theme-color") === "theme-dark") {
      localStorage.setItem("theme-color", "theme-light");
    } else {
      localStorage.setItem("theme-color", "theme-dark");
    }
    this.themeColorSubject$.next(localStorage.getItem("theme-color"));
  }
}
