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
      title: "Databases",
      icon: "home",
      route: "",
    },
    {
      title: "Add Database",
      icon: "add_circle",
      route: "database/add",
    },
    {
      title: "About",
      icon: "info",
      route: "about",
    },
  ];
}
