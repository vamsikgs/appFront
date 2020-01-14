import { AppHttpService } from "./app.http.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private appHttpService: AppHttpService) {}

  private table: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];

  updating = new Subject<number>();

  getList() {
    this.appHttpService.list().subscribe(response => {
      console.log(response);
      /* const arr: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      }[] = []; */
      for (const key in response.result) this.table.push(response.result[key]);
      // this.table = arr;
    });
    return this.table;
  }

  getTable(i: number) {
    return this.table[i];
  }
}
