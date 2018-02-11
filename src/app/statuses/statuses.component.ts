import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusesService } from '../statuses.service';
import Status from '../status';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  statuses: Status[]

  constructor(private statusesService: StatusesService) { }

  ngOnInit() {
    this.getStatuses();
  }

  getStatuses() {
    this.statusesService.getStatuses()
    .subscribe(statuses => this.statuses = statuses);
  }
}
