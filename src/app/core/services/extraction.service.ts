import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExtractionService {
  extractData(dataToExtract: any, method: string) {
    return dataToExtract.data[`${method}`].map((value: any) => {
      return {
        code: value.code,
        label: value.label,
        values: [
          {
            value: value.scale1.value,
            label: value.scale1.label,
            metric: value.scale1.metric,
          },
          {
            value: value.scale2.value,
            label: value.scale2.label,
            metric: value.scale2.metric,
          },
          {
            value: value.scale3.value,
            label: value.scale3.label,
            metric: value.scale3.metric,
          },
          {
            value: value.scale4.value,
            label: value.scale4.label,
            metric: value.scale4.metric,
          },
          {
            value: value.scale5.value,
            label: value.scale5.label,
            metric: value.scale5.metric,
          },
        ],
      };
    });
  }

  prepareSections(response: any, sections: any) {
    let data: any = sections;
    let dataAsArray: any[] = [];
    response.forEach((obj: any) => {
      let codePrefix = obj.code.split('-')[0]; // Get the prefix of the code
      if (codePrefix in data) {
        data[codePrefix].push(obj);
      }
    });
    dataAsArray = Object.values(data);
    return dataAsArray;
  }
}
