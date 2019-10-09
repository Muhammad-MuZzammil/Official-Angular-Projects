import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(item){
      if(item.name.toLowerCase().startsWith(args) || item.name.toUpperCase().startsWith(args))
        return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
