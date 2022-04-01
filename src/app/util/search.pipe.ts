import { Pipe, PipeTransform } from '@angular/core';

import { User }   from '../interfaces/user';
import { Client } from '../interfaces/client';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) { return items; }

    return items.filter(item => this.getSearchableAttributes(item)
                        .map((i: string) => i.toLowerCase().includes(filter.toLowerCase()))
                        .reduce((a, b) => (a || b)));
  }

  getSearchableAttributes(item: User | Client): string[] {
    const result = [];
    if ((item as User).username      !== undefined) { result.push((item as User).username); }
    if ((item as Client).client_id   !== undefined) { result.push((item as Client).client_id); }
    if ((item as Client).client_name !== undefined) { result.push((item as Client).client_name); }
    return result;
  }
}
