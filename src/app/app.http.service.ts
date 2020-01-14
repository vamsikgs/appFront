import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResponseModel } from "./response.model";

@Injectable({
  providedIn: "root"
})
export class AppHttpService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ResponseModel>("http://localhost:8080/app/list");
  }

  update(data) {
    return this.http.post<ResponseModel>("http://localhost:8080/app/add", data);
  }

  delete(data) {
    return this.http.get<ResponseModel>(
      "http://localhost:8080/app/deleteById/" + data
    );
  }
}
