import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Country } from "../models/country";

@Injectable({
  providedIn: "root"
})
export class ApiCallServiceService {
  constructor(private httpClient: HttpClient) {}
  private _countries: Observable<Country[]>;

  searchCountryByName(name: string): Observable<Country[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    headers = headers.append(
      "X-RapidAPI-Key",
      "1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965"
    );
    return (
      this.httpClient
        // .get(`https://restcountries-v1.p.rapidapi.com/capital/` + name, {
        //   headers: headers
        // })
        .get("https://api.first.org/data/v1/countries")
        .pipe(
          map((data: Country[]) => {
            return data;
          }),
          catchError(error => {
            return throwError("Capital not found!");
          })
        )
    );
  }

  SearchCountry(searchkey: string): Observable<Country[]> {
    return this.GetCountries().pipe(
      map(items =>
        items.filter(item => item.name.toLowerCase().indexOf(searchkey) > -1)
      )
    );
  }

  GetCountries(): Observable<Country[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    headers = headers.append(
      "X-RapidAPI-Key",
      "1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965"
    );

    return this.httpClient
      .get(`https://restcountries-v1.p.rapidapi.com/all/`, {
        headers: headers
      })
      .pipe(
        map((data: Country[]) => {
          return data;
        }),

        catchError(error => {
          return throwError("Get Countries error" + error.message);
        })
      );
  }
}
