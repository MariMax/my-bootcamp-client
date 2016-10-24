import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform{
  transform(value: number): string{
    const hours = value / 60 | 0;
    const minutes = value % 60;
    return `${hours}h ${minutes}m`;
  }
}
