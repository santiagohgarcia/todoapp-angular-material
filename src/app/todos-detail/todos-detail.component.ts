import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs/observable/of';

import Todo from '../todo';
import Status from '../status';
import { TodosService } from '../todos.service';
import { StatusesService } from '../statuses.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-todos-detail',
  templateUrl: './todos-detail.component.html',
  styleUrls: ['./todos-detail.component.css']
})
export class TodosDetailComponent implements OnInit {
  @Input() todo: Todo;
  @Input() statuses: Status[];
  saveFunction;
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required, Validators.nullValidator]);
  todoForm: FormGroup = new FormGroup({
    title: this.title,
    description: this.description,
    status: this.status
  });

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private statusesService: StatusesService,
    private location: Location,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getStatuses();
    this.getTodo();
  }

  getTodo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todosService.getTodo(id)
        .subscribe(todo => {
        this.todo = todo;
          this.saveFunction = 'updateTodo'
        });
    } else {
      this.todo = new Todo
      this.saveFunction = 'createTodo'
    }
  }

  goBack(): void {
    this.location.back();
  }

  getStatuses(): void {
    this.statusesService.getStatuses()
      .subscribe(statuses => { this.statuses = statuses })

  }

  save(): void {
    if (this.todoForm.valid) {
      this.todosService[this.saveFunction](this.todo)
        .subscribe(res => this.goBack(),
        err => this.openSnackBar(err.message, "OK"))
    }
  }

  delete() {
    this.todosService.deleteTodo(this.todo._id)
      .subscribe(res => this.goBack(),
                 err => this.openSnackBar(err.message, "OK"))
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }
}
