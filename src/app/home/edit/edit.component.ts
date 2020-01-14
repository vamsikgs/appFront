import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { AppHttpService } from "src/app/app.http.service";
import { AppService } from "src/app/app.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  subscribe: Subscription;
  editing: boolean = false;
  editingIndex: number;
  customerValue: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  constructor(
    private appHttpService: AppHttpService,
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstName: [null],
      lastName: [null],
      email: [null]
    });
    this.subscribe = this.appService.updating.subscribe((i: number) => {
      this.editing = true;
      this.editingIndex = i;
      console.log(this.appService.getTable(this.editingIndex).id);
      this.customerValue = this.appService.getTable(i);
      this.editForm.setValue({
        id: this.customerValue.id,
        firstName: this.customerValue.firstName,
        lastName: this.customerValue.lastName,
        email: this.customerValue.email
      });
    });
  }

  onSubmit() {
    const fd = new FormData();
    fd.append("customer", JSON.stringify(this.editForm.value));
    this.appHttpService.update(fd).subscribe(response => {
      console.log(response);
      location.reload();
    });
  }

  onDelete() {
    this.appHttpService
      .delete(this.appService.getTable(this.editingIndex).id)
      .subscribe(response => {
        console.log(response);
        location.reload();
      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
