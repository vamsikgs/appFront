import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  constructor(private appService: AppService) {}

  table: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];

  ngOnInit() {
    this.getListOfCustomers();
  }

  private getListOfCustomers() {
    this.table = this.appService.getList();
  }

  onSelectedCustomer(i) {
    this.appService.updating.next(i);
  }
}
