import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services';
import { Task } from '../_models';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: string;
    public tasks: any;
    isNewtask: boolean = false;
    isEdit: boolean = false;
    defaultTask: Task = {
        taskDescription: 'enter task description',
        taskName: 'enter task name',
        taskId: null,
        estimatedTime: 0,
        userName: this.currentUser
    };
    task: Task;
    taskID: number;

    constructor(
        private userService: UserService,
        private router: Router) {
        this.currentUser = sessionStorage.getItem('currentUser');
        this.defaultTask.userName = this.currentUser;
    }

    ngOnInit() {
        this.task = JSON.parse(JSON.stringify(this.defaultTask));
        this.loadUsertasks();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadUsertasks();
        });
    }

    private loadUsertasks() {
        this.userService.getTasks(this.currentUser).pipe().subscribe(tasks => {
            this.tasks = tasks != null && tasks != undefined ? tasks.responseBody : null
        });
    }

    updateTask(task, id: number, updatedtaskName: string, updatedtaskDescription: string, updatedestimatedTime: number) {
        task.taskId = id;
        task.taskName = updatedtaskName;
        task.taskDescription = updatedtaskDescription;
        task.estimatedTime = updatedestimatedTime;
        this.userService.update(task).pipe().subscribe(() => {
            this.loadUsertasks()
            this.isEdit = false;
        });
    }

    createTask() {
        this.userService.create(this.task).pipe().subscribe(() => {
            this.task = JSON.parse(JSON.stringify(this.defaultTask));
            this.loadUsertasks();
            this.isNewtask = false;
        });
    }

    editComponent(id: number) {
        this.taskID = id;
        this.isEdit = true;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}