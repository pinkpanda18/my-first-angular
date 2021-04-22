import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee } from "../models/employee";

@Injectable()
export class EmployeeService {
  Employees: Employee[];
  Profile: Employee;

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of(this.Employees);
  }
}
