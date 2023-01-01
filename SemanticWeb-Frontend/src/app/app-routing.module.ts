import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "./shared/standalone-components/default/default.component";
import { HeaderComponent } from "./shared/standalone-components/header/header.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./features/main-page/main-page.component").then(
            (m) => m.MainPageComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
