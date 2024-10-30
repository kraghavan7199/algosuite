import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { HttpClient } from "@angular/common/http";





@Injectable({
    providedIn: 'root'
  })
  export class StringService {
    private apiUrl = environment.apiUrl;
    
    constructor(private http: HttpClient) {
    }

    getSubstringAnalysis(string: string) {
       return this.http.get(this.apiUrl + `/string/${string}/substrings`)
    }

    getUserHistory(limit: number, skip: number) {
      const criteria =  {limit, skip};
      return this.http.get(this.apiUrl + `/string/history?criteria=${JSON.stringify(criteria)}`);
    }

    getStringSuggestions(string: string) {
      return this.http.get(this.apiUrl + `/string/${string}/suggestions`)
    }
}
