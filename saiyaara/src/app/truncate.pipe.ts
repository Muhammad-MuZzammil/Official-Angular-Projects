import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class TruncatePipe implements PipeTransform {
 
  transform(value: any, args?: any): any {
    let limit = args ? parseInt(args, 10) : 10;
    let trail = '...';

    return value.trim().split(' ').length > limit ? value.trim().split(' ').slice(0,limit).join(' ') + trail : value;
  }

}
