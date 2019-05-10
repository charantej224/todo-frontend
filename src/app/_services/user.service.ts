import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User, Task } from '../_models';

@Injectable()
export class UserService {
    public authorizationHeaders: HttpHeaders;
    public authorizationReqOptions: any;
    token: string;
    name: string;
    constructor(private http: HttpClient) { 
        this.token = sessionStorage.getItem('token');
        this.authorizationHeaders = new HttpHeaders({ 
        'Content-Type': 'application/json; charset=utf-8',    
        'Authorization': this.token
        });
        this.authorizationReqOptions = {
            headers: this.authorizationHeaders,
            responseType: 'json'
        }
    }

    register(user: User) {
        return this.http.post(`http://localhost:9080/todoservice/sign-up`, {userName: user.username,password: user.password});      
    }

    create(task: Task) {
        return this.http.post(`http://localhost:9080/todoservice/api/task-details`, JSON.stringify(task),this.authorizationReqOptions);
    }

    update(task: Task) {
        return this.http.put(`http://localhost:9080/todoservice/api/task-details`, JSON.stringify(task),this.authorizationReqOptions);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:9080/todoservice/api/task-details/` + id,this.authorizationReqOptions);
    }

    getTasks(name: string) : Observable<any> {
        return this.http.get('http://localhost:9080/todoservice/api/task-details?name='+name,this.authorizationReqOptions);
    }

}