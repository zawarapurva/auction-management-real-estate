import { AbstractControl, ValidatorFn } from '@angular/forms';

export function bidValidator(bidValMultiple): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        console.log(control.value);
        console.log(bidValMultiple);
        if ((control.value % bidValMultiple ) !== 0) {
            return { validBid: true };
        }
        return null;
    };
}
