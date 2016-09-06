import {FormGroup} from '@angular/forms';

export const equalValidator = (group: FormGroup): { [s: string]: boolean } => {
  let array = Object.keys(group.controls).map(key=>group.controls[key]);
  const firstValue = array[0].value;
  return array.every(i=>i.value === firstValue)?null:{equal:true}
};
