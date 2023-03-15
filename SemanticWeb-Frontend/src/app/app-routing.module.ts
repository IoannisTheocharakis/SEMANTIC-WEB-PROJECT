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
        path: "datasets",
        loadComponent: () =>
          import("./features/main-page/main-page.component").then(
            (m) => m.MainPageComponent
          ),
        children: [
          {
            path: "chart",
            loadComponent: () =>
              import(
                "./features/main-page/main-page-chart/main-page-chart.component"
              ).then((m) => m.MainPageChartComponent),
          },
          {
            path: "table",
            loadComponent: () =>
              import(
                "./features/main-page/main-page-table/main-page-table.component"
              ).then((m) => m.MainPageTableComponent),
          },
        ],
      },
      {
        path: "dataset-details/:id",
        loadComponent: () =>
          import("./features/database-details/database-details.component").then(
            (m) => m.DatabaseDetailsComponent
          ),
        children: [
          {
            path: "properties",
            loadComponent: () =>
              import(
                "./features/database-details/database-properties/database-properties.component"
              ).then((m) => m.DatabasePropertiesComponent),
          },
          {
            path: "properties/cidoc",
            loadComponent: () =>
              import(
                "./features/database-details/database-properties/database-properties.component"
              ).then((m) => m.DatabasePropertiesComponent),
          },
          {
            path: "classes",
            loadComponent: () =>
              import(
                "./features/database-details/database-classes/database-classes.component"
              ).then((m) => m.DatabaseClassesComponent),
          },
          {
            path: "classes/cidoc",
            loadComponent: () =>
              import(
                "./features/database-details/database-classes/database-classes.component"
              ).then((m) => m.DatabaseClassesComponent),
          },
        ],
      },
      {
        path: "common",
        loadComponent: () =>
          import(
            "./features/common-elements/common-elements/common-elements.component"
          ).then((m) => m.CommonElementsComponent),
      },
      {
        path: "dataset/add",
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
