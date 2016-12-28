import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to trim the text to given length
 * and add '...' (by default).
 */
@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  public transform(value: string, length = 72, append = '...'): string {
    const trimmed = value.substr(0, length);
    return trimmed !== value ? trimmed + append : value;
  }
}
