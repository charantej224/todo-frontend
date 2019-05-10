import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class AuthenticationService {
    public customContentHeaders: HttpHeaders;
    public customContentReqOptions: any;
    constructor(private http: HttpClient) { 

    this.customContentHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/octet-stream'
    });

    this.customContentReqOptions = {
        headers: this.customContentHeaders,
        observe: 'response',
        responseType: 'json'
    };
    }

    login(username: string, password: string) : Observable<any> {
       return this.http.post<any>(`http://localhost:9080/todoservice/login`,{ userName: username, password: password },this.customContentReqOptions);
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}