import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateFormatter'})
export class DateFormatterPipe implements PipeTransform {
  transform(unix: number): any {
    return moment(unix).format('YYYY-MM-DD HH:mm')
  }
}