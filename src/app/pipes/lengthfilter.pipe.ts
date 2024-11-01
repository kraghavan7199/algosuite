import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lengthFilter',
  standalone: true

})
export class LengthFilterPipe implements PipeTransform {
  transform(items: string[], maxLength: number): string[] {
    if (!items) return [];
    return items.filter(item => item.length <= maxLength);
  }
}