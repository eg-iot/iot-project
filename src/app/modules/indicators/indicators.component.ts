import { ToastrService } from 'ngx-toastr';
import { DataService } from './../../core/services/data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, first, forkJoin } from 'rxjs';
import { IData } from 'src/app/shared/models/cell';
import { HttpErrorResponse } from '@angular/common/http';
import { TablesAnimation } from 'src/app/shared/animations/cards-animation';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
  animations: [TablesAnimation],
})
export class IndicatorsComponent implements OnInit {
  @ViewChild('toTopBtn') toTopBtn!: ElementRef<HTMLElement>;
  data: IData[] = [];
  isLoading: boolean = false;
  newDataFetched: boolean = false;
  constructor(
    private DataService: DataService,
    private ToastrService: ToastrService
  ) {
    DataService.getFetchingData()
      .pipe(filter((value) => value == true))
      .subscribe(() => {
        this.newDataFetched = true;
        this.fetchData();
      });
    DataService.getLoading().subscribe((loading) => (this.isLoading = loading));
  }
  ngOnInit(): void {
    this.fetchData();

    window.addEventListener('scroll', () => {
      if (window.scrollY > 200)
        this.toTopBtn.nativeElement.classList.add('show');
      else this.toTopBtn.nativeElement.classList.remove('show');
    });
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  fetchData() {
    this.DataService.setLoading(true);
    forkJoin({
      environmental: this.DataService.getEnvironmentalData().pipe(),
      destination: this.DataService.getDestinationData().pipe(),
      experience: this.DataService.getExperienceData().pipe(),
    }).subscribe({
      next: ({ environmental, destination, experience }) => {
        this.DataService.setFetchingData(false);
        this.data = [];
        this.data.push(
          {
            headerColor: '#77933c',
            rightCellName: 'Environmental Satisfaction',
            leftCellName: 'Environmental Performance',
            multipleCols: true,
            sampleFiles: {
              performance: 'assets/samples/environmental-performance.xlsx',
              satisfaction: 'assets/samples/environmental-satisfaction.xlsx',
            },
            leftCol: [...environmental.performance],

            rightCol: [...environmental.satisfaction],
          },
          {
            headerColor: '#604a7b',
            rightCellName: 'Destination Satisfaction',
            leftCellName: 'Destination Performance',
            sampleFiles: {
              performance: 'assets/samples/destination-performance.xlsx',
              satisfaction: 'assets/samples/destination-satisfaction.xlsx',
            },
            multipleCols: true,
            leftCol: destination.performance,
            rightCol: destination.satisfaction,
          },

          {
            headerColor: '#e46c0a',
            rightCellName: 'Activities Insensitivity ',
            leftCellName: 'Activities Satisfaction',
            multipleCols: true,
            sampleFiles: {
              performance:
                'assets/samples/tourists-experience-performance.xlsx',
              satisfaction:
                'assets/samples/tourists-experience-satisfaction.xlsx',
            },
            leftCol: [experience.performance[0]],
            rightCol: [experience.satisfaction[0]],
          },
          {
            headerColor: '#e46c0a',
            leftCellName: 'Emotional / Feelings Experience',
            cellSymbol: 'T',
            multipleCols: false,
            sampleFiles: {
              performance:
                'assets/samples/tourists-experience-performance.xlsx',
              satisfaction:
                'assets/samples/tourists-experience-satisfaction.xlsx',
            },
            leftCol: [experience.performance[1]],
          },
          {
            headerColor: '#e46c0a',
            leftCellName: 'Suggested Behaviors',
            sampleFiles: {
              performance:
                'assets/samples/tourists-experience-performance.xlsx',
              satisfaction:
                'assets/samples/tourists-experience-satisfaction.xlsx',
            },
            leftCol: [experience.performance[2]],
          }
        );
        console.log(this.data);
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
