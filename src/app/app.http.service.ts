import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResponseModel } from "./response.model";

@Injectable({
  providedIn: "root"
})
export class AppHttpService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ResponseModel>(
      "http://ec2-54-70-232-75.us-west-2.compute.amazonaws.com:8080/app/list"
    );
  }

  update(data) {
    return this.http.post<ResponseModel>(
      "http://ec2-54-70-232-75.us-west-2.compute.amazonaws.com:8080/app/add",
      data
    );
  }

  delete(data) {
    return this.http.get<ResponseModel>(
      "http://ec2-54-70-232-75.us-west-2.compute.amazonaws.com:8080/app/deleteById/" +
        data
    );
  }
}
