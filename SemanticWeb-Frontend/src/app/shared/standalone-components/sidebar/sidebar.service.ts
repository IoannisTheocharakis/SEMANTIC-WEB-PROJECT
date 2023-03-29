import { Injectable } from "@angular/core";

export interface NavItem {
  title: string;
  disabled?: boolean;
  icon?: string;
  route?: string;
  disallow?: string[];
  children?: NavItem[];
}

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  constructor() {}

  menu: NavItem[] = [
    {
      title: "Datasets",
      icon: "home",
      route: "datasets",
    },
    {
      title: "Global Search",
      icon: "search",
      route: "globalSearch",
    },
    {
      title: "Common Entities",
      icon: "compare_arrows",
      route: "common",
    },
    {
      title: "Add Datasets",
      icon: "add_circle",
      route: "dataset/add",
    },

    {
      title: "About",
      icon: "info",
      route: "about",
    },
  ];
}
