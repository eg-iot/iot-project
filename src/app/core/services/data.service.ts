import { ExtractionService } from './extraction.service';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject, combineLatest, forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private $loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isFetchingData: Subject<boolean> = new Subject();
  private readonly ACTIONS_QUERY = gql`
    {
      getActionTypeAndNeededAction {
        environmentalQualityActionTypes {
          code
          label
          actionType
        }
        destinationQualityActionTypes {
          code
          label
          actionType
        }
        experienceQualityActionTypes {
          code
          label
          actionType
        }
      }
    }
  `;
  constructor(
    private apollo: Apollo,
    private ExtractionService: ExtractionService
  ) {}

  setFetchingData(value: boolean) {
    this.isFetchingData.next(value);
  }
  getFetchingData() {
    return this.isFetchingData;
  }
  setLoading(load: boolean) {
    this.$loading.next(load);
  }
  getLoading() {
    return this.$loading;
  }
  private getData(method: string) {
    return this.apollo
      .subscribe({
        query: gql`
      {
        ${method}{
            _id
            code
            label
            scale1 {
              label
              value
              metric
            }
            scale2 {
              label
              value
              metric
            }
            scale3 {
              label
              value
              metric
            }
            scale4 {
              label
              value
              metric
            }
            scale5 {
              label
              value
              metric
            }
        }
      }`,
      })
      .pipe();
  }
  getDestinationData() {
    let performanceSections: { [key: string]: any[] } = {
      D1: [],
      D2: [],
      D3: [],
      D4: [],
    };
    let satisfactionSections: { [key: string]: any[] } = {
      D1: [],
      D2: [],
      D3: [],
      D4: [],
    };
    return forkJoin({
      performance: this.getData('getDestinationQualityPerformance'),
      satisfaction: this.getData('getDestinationQualitySatisfaction'),
    }).pipe(
      map(({ performance, satisfaction }) => {
        let performancData = this.ExtractionService.extractData(
          performance,
          'getDestinationQualityPerformance'
        );
        let satisfactionData = this.ExtractionService.extractData(
          satisfaction,
          'getDestinationQualitySatisfaction'
        );

        return {
          performance: this.ExtractionService.prepareSections(
            performancData,
            performanceSections
          ),
          satisfaction: this.ExtractionService.prepareSections(
            satisfactionData,
            satisfactionSections
          ),
        };
      })
    );
  }

  getExperienceData() {
    let performanceSections: { [key: string]: any[] } = {
      T1: [],
      T3: [],
      T4: [],
    };
    let satisfactionSections: { [key: string]: any[] } = {
      T1: [],
      T3: [],
      T4: [],
    };
    return forkJoin({
      performance: this.getData('getExperienceQualityPerformance'),
      satisfaction: this.getData('getExperienceQualitySatisfaction'),
    }).pipe(
      map(({ performance, satisfaction }) => {
        let performancData = this.ExtractionService.extractData(
          performance,
          'getExperienceQualityPerformance'
        );
        let satisfactionData = this.ExtractionService.extractData(
          satisfaction,
          'getExperienceQualitySatisfaction'
        );

        return {
          performance: this.ExtractionService.prepareSections(
            performancData,
            performanceSections
          ),
          satisfaction: this.ExtractionService.prepareSections(
            satisfactionData,
            satisfactionSections
          ),
        };
      })
    );
  }

  getEnvironmentalData() {
    let performanceSections: { [key: string]: any[] } = {
      E1: [],
      E2: [],
    };
    let satisfactionSections: { [key: string]: any[] } = {
      E1: [],
      E2: [],
    };
    return forkJoin({
      performance: this.getData('getEnvironmentalQualityPerformance'),
      satisfaction: this.getData('getEnvironmentalQualitySatisfaction'),
    }).pipe(
      map(({ performance, satisfaction }) => {
        let performancData = this.ExtractionService.extractData(
          performance,
          'getEnvironmentalQualityPerformance'
        );
        let satisfactionData = this.ExtractionService.extractData(
          satisfaction,
          'getEnvironmentalQualitySatisfaction'
        );

        return {
          performance: this.ExtractionService.prepareSections(
            performancData,
            performanceSections
          ),
          satisfaction: this.ExtractionService.prepareSections(
            satisfactionData,
            satisfactionSections
          ),
        };
      })
    );
  }

  getNeededActionTypes() {
    return this.apollo
      .subscribe({
        query: this.ACTIONS_QUERY,
      })
      .pipe(
        map(({ data }: any) => {
          return {
            environmental: {
              ...data.getActionTypeAndNeededAction.environmentalQualityActionTypes.map(
                (data: any) => {
                  return {
                    ...data,
                    actionType: data.actionType.replace('Type ', ''),
                  };
                }
              ),
            },
            destination: {
              ...data.getActionTypeAndNeededAction.destinationQualityActionTypes.map(
                (data: any) => {
                  return {
                    ...data,
                    actionType: data.actionType.replace('Type ', ''),
                  };
                }
              ),
            },
            experience: {
              ...data.getActionTypeAndNeededAction.experienceQualityActionTypes.map(
                (data: any) => {
                  return {
                    ...data,
                    actionType: data.actionType.replace('Type ', ''),
                  };
                }
              ),
            },
          };
        })
      );
  }
}
