import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'photosFilter'
})
export class PhotosPipe implements PipeTransform {

  public transform(value: Photo[], name: string): Photo[] {
    if(!name) {
      return value;
    }
    return value.filter(photo => `${photo.name}`.indexOf(name) !== -1);
  }

}
