import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { MyTestComponentComponent } from "./my-test-component/my-test-component.component";
import { ApiCallServiceService } from "./shared/services/api-call-service.service";
import { EmployeeService } from "./shared/services/employee.service";

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, MyTestComponentComponent],
  bootstrap: [AppComponent],
  providers: [ApiCallServiceService, EmployeeService]
})
export class AppModule {}
