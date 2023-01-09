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
        children: [
          {
            path: "databases/chart",
            loadComponent: () =>
              import(
                "./features/main-page/main-page-chart/main-page-chart.component"
              ).then((m) => m.MainPageChartComponent),
          },
          {
            path: "databases/table",
            loadComponent: () =>
              import(
                "./features/main-page/main-page-table/main-page-table.component"
              ).then((m) => m.MainPageTableComponent),
          },
        ],
      },
      {
        path: "database/add",
        loadComponent: () =>
          import("./features/mainForm/mainForm.component").then(
            (m) => m.MainFormComponent
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
