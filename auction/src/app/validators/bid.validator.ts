import { AbstractControl } from '@angular/forms';

export function ValidateBid(bidValMultiple) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        console.log(control.value);
        console.log(bidValMultiple);
        console.log(control);
        if ((control.value % bidValMultiple ) === 0) {
            return { validBid: true };
        }
        return null;
    };
}
