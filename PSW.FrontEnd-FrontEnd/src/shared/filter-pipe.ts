import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string, property: string): any[] {
    if (!items || !filter || !property) {
      return items;
    }
    return items.filter((item) => item[property] == filter);
  }
}
