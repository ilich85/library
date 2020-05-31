import {Injectable} from '@angular/core';

@Injectable()
export class DataParserService {

  parseData(data) {
    return JSON.parse(JSON.stringify(data));
  }
}
