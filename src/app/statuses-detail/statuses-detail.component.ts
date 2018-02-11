import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs/observable/of';
import Status from '../status';
import { StatusesService } from '../statuses.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-statuses-detail',
  templateUrl: './statuses-detail.component.html',
  styleUrls: ['./statuses-detail.component.css']
})
export class StatusesDetailComponent implements OnInit {

  @Input() status: Status;
  saveFunction;
  description = new FormControl('', [Validators.required]);
  statusForm: FormGroup = new FormGroup({
    description: this.description
  });

  constructor(
    private route: ActivatedRoute,
    private statusesService: StatusesService,
    private location: Location,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.statusesService.getStatus(id)
        .subscribe(status => {
        this.status = status;
          this.saveFunction = 'updateStatus'
        });
    } else {
      this.status = new Status
      this.saveFunction = 'createStatus'
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.statusForm.valid) {
      this.statusesService[this.saveFunction](this.status)
        .subscribe(res => this.goBack(),
        err => this.openSnackBar("Error when processing update", "OK"))
    }
  }
  
  delete() {
    this.statusesService.deleteStatus(this.status._id)
      .subscribe(res => this.goBack(),
      err => this.openSnackBar("Error deleting item", "OK"))
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
