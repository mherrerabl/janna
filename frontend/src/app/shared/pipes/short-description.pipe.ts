import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(text: string, maxWords: number): string {
    let arrayWords: string[] = text.split(' ');
    if (arrayWords.length <= maxWords) {
      return text;
    }

    return arrayWords.slice(0, maxWords).join(' ') + '...';
  }
}
