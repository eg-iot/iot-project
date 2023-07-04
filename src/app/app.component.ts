import { DataService } from './core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesAnimation } from './shared/animations/cards-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [TablesAnimation],
})
export class AppComponent implements OnInit {
  isLoading!: boolean;
  constructor(public router: Router, public DataService: DataService) {
    this.DataService.getLoading().subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {}
}
