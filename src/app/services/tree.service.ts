import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { HttpClient } from "@angular/common/http";





@Injectable({
    providedIn: 'root'
  })
  export class TreeService {
    private apiUrl = environment.apiUrl;
    
    constructor(private http: HttpClient) {
    }

    saveTree(tree: any) {
        return this.http.post(this.apiUrl + '/tree', {tree});
    }

    getTree() {
        return this.http.get(this.apiUrl + '/tree')
    }

    calculateMaxSumPath(type: string) {
        return this.http.get(this.apiUrl + `/tree/${type}`)
    }

    generateBinaryTree(payload: any) {
        return this.http.post(this.apiUrl + '/tree/generate', payload);
    }


}