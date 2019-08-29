import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(values: any, ...args: any[]): any {
    return !!values ? values.filter((item) => item.title.indexOf(args[0]) > -1) : null;
  }

}
