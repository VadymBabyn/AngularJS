import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + 'В';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'М';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'К';
    } else {
      return value.toString();
    }
  }
}
