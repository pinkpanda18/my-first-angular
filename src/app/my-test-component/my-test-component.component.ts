import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { timer, fromEvent, interval, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  filter,
  mapTo,
  map,
  tap,
  pluck
} from "rxjs/operators";

import { ajax } from "rxjs/ajax";
import { ApiCallServiceService } from "../shared/services/api-call-service.service";

import { Country } from "../shared/models/country";

@Component({
  selector: "app-my-test-component",
  templateUrl: "./my-test-component.component.html",
  styleUrls: ["./my-test-component.component.css"]
})
export class MyTestComponentComponent implements OnInit {
  //constructor() {}
  constructor(private apiService: ApiCallServiceService) {}
  //apiService: ApiCallServiceService;

  CountrySearchForm = new FormGroup({
    name: new FormControl(""),
    countrycode: new FormControl("")
  });

  public currentNumber = 0;
  public CountryList: Country[];
  public CountrySearchResult: Country[];

  ngOnInit(): void {
    this.GetCountries();
    const searchBox = document.getElementById("search-box");

    const typeahead = fromEvent(searchBox, "input").pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(searchTerm => this.apiService.SearchCountry(searchTerm))
    );

    typeahead.subscribe(data => {
      this.CountryList = data;
      //console.log(data);
      // Handle the data from the API
    });

    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);

    // Subscribe to begin publishing values
    const subscription = secondsCounter.subscribe(n => {
      const compute = n + 1;
      this.currentNumber = compute % 2 == 0 ? 100 : compute;
    });
  }
  onSubmit(): void {}
  GetCountries() {
    this.apiService.GetCountries().subscribe((data: Country[]) => {
      this.CountryList = data;
    });
  }
}
