import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ahwSortArray'})

export class AhwSortArrayPipe implements PipeTransform {
    transform(data: Array<any>, key, type?: string) {
        let result = data;

        if(!data) return result

        if(type === 'asc' || type === undefined) {
            //ascending
            result = data.sort((a, b) => a[key] - b[key]);
        }else if(type === 'desc') {
            // descending
            result = data.sort((a, b) => b[key] - a[key]);
        }

        return result;
    }
}
