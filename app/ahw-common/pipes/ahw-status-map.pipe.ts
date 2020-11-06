import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ahwStatusMap'})

export class AhwStatusMapPipe implements PipeTransform {
    transform(type: string) {
        /**
         * @type {Object}
         * Lookup map for satus map
         */
        const typesLookupMap = {
            "Disable" : 'warning',
            "Pending": 'danger',
            "Active" : 'primary'
        }

    return typesLookupMap[type] || 'primary';
    }
}
