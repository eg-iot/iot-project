import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SurveyService {
  private readonly apiUrl = 'https://api.surveymonkey.com/v3/surveys';

  constructor(private httpClient: HttpClient) {}
  getSurveyDetailsAndResponses() {
    forkJoin({
      survey: this.getSurveyDetails().pipe(),
      responses: this.getSurveyResponses().pipe(),
    }).subscribe(({ survey, responses }) => {
      // let answersIdsArray: string[] = [];
      // const surveyQuestionsArray: any[] = survey.pages[0].questions;
      // const responseQuestions: any[] = responses.data.map(
      //   (data: any) => data.pages[0].questions
      // );
      // responseQuestions.forEach((question) => {
      //   answersIdsArray.push(
      //     ...question[0].answers.map((answers: any) => answers.choice_id)
      //   );
      // });
      // answersIdsArray.forEach((id) => {
      //   this.findQuestionAnswer(surveyQuestionsArray, id);
      // });
    });
  }

  private findQuestionAnswer(questionsArray: any[], id?: string) {
    questionsArray.forEach((question) => {
      let choicesArray: any[] = question.answers.choices;
      let answerText = choicesArray.find((choice) => choice.id === id).text;
    });
  }
  getSurveyDetails() {
    return this.httpClient.get<any>(`${this.apiUrl}/510086827/details`);
  }

  getSurveyResponses() {
    return this.httpClient.get<any>(`${this.apiUrl}/510086827/responses/bulk`);
  }
}
