import { TablesAnimation } from 'src/app/shared/animations/cards-animation';
import { DataService } from './../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface IRow {
  symbol: string;
  color: string;
  title: string;
  data: any[];
}
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  animations: [TablesAnimation],
})
export class ActionsComponent implements OnInit {
  isLoading: boolean = false;
  rows: IRow[] = [
    {
      symbol: 'A',
      color: '#a4d955',
      title: 'Focus is needed',
      data: [[], [], []],
    },
    {
      symbol: 'B',
      color: '#f29f05',
      title: 'Keep-up the good work',
      data: [[], [], []],
    },
    {
      symbol: 'C',
      color: '#984807',
      title: 'Urgent action is needed',
      data: [[], [], []],
    },
    {
      symbol: 'D',
      color: '#00b0f0',
      title: 'Change in Plan is needed',
      data: [[], [], []],
    },
    {
      symbol: 'E',
      color: '#bfbfbf',
      title: ' Back-Up plan is needed',
      data: [[], [], []],
    },
  ];

  constructor(
    private DataService: DataService,
    private ToastrService: ToastrService
  ) {
    DataService.getLoading().subscribe((loading) => (this.isLoading = loading));
  }

  ngOnInit(): void {
    this.DataService.setLoading(true);

    this.DataService.getNeededActionTypes().subscribe({
      next: (data: any) => {
        const dataIndex: any = {
          environmental: 0,
          experience: 1,
          destination: 2,
        };
        for (let dataType in data) {
          for (let key in data[dataType]) {
            let item = data[dataType][key];
            let row = this.rows.find((r) => r.symbol === item.actionType);
            if (row) {
              row.data[dataIndex[dataType]].push({
                code: item.code,
                label: item.label,
              });
            }
          }
        }
      },
      error: (err: any) => {
        this.DataService.setLoading(false);
        if (err instanceof HttpErrorResponse)
          this.ToastrService.error(err.error);
        else this.ToastrService.error(err);
      },
      complete: () => {
        this.DataService.setLoading(false);
      },
    });
  }
}
