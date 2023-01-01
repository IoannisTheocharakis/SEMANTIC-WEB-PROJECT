import { IDatabase } from "../interfaces/database.interface";

export class DatabaseData {
  public static matrix = [
    // [1101, 53, 34, 79, 204, 498, 80, 532], // Apple
    // [14, 266, 4, 23, 35, 53, 32, 215], // HTC
    // [12, 0, 159, 0, 4, 9, 5, 32],   //Huawei
    // [15, 7, 5, 266, 35, 63, 13, 3], // LG
    // [51, 11, 7, 12, 798, 121, 41, 23], // Nokia
    // [102, 61, 29, 78, 181, 2022, 76, 58], // Samsung
    // [45, 8, 8, 17, 23, 57, 266, 157], // Sony
    // [54, 12, 4, 21, 23, 78, 34, 532], // Other
    [100, 0, 0, 0, 0, 0, 0, 0], // Apple
    [0, 100, 0, 0, 0, 0, 0, 0], // HTC
    [0, 0, 100, 0, 0, 0, 0, 0], //Huawei
    [0, 0, 0, 100, 0, 0, 0, 0], // LG
    [0, 0, 0, 0, 100, 0, 0, 0], // Nokia
    [0, 0, 0, 0, 0, 100, 0, 0], // Samsung
    [0, 0, 0, 0, 0, 0, 100, 0], // Sony
    [0, 0, 0, 0, 0, 0, 0, 100], // Other
  ];

  public static groups: IDatabase[] = [
    {
      name: "Apple",
      colour: "#8a3ffc",
    },
    {
      name: "HTC",
      colour: "#ff7eb6",
    },
    {
      name: "Huawei",
      colour: "#6fdc8c",
    },
    {
      name: "LG",
      colour: "#d2a106",
    },
    {
      name: "Nokia",
      colour: "#ba4e00",
    },
    {
      name: "Samsung",
      colour: "#33b1ff",
    },
    {
      name: "Sony",
      colour: "#fa4d56",
    },
    {
      name: "Other",
      colour: "#4589ff",
    },
  ];
}
