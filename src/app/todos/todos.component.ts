import { Component, ViewChild, OnInit } from '@angular/core';
import Todo from '../todo';
import { TodosService } from '../todos.service';
import { MatSidenav, MatSnackBar } from '@angular/material';

const doneStatus = "5a7a5b4249f3c32c884a8809";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos:Todo[]

  constructor(private todoService:TodosService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos,
               err => this.openSnackBar(err.message,"OK"));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });  
  }

}
