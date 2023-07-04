import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExtractionService {
  extractData(dataToExtract: any, method: string) {
    return dataToExtract.data[`${method}`].map((value: any) => {
      return {
        code: value.code,
        label: value.label,
        values: [
          value.scale1.value,
          value.scale2.value,
          value.scale3.value,
          value.scale4.value,
          value.scale5.value,
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
