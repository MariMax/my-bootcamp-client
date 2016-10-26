import {FormControl} from '@angular/forms';

export function dateValidator(ctrl:FormControl) {
  if (!ctrl.value) return null;
  if (ctrl.value.length<10){
    return {date:true};
  }
  const splited = ctrl.value.split('.');
  if (splited.length<3){
    return {date:true}
  }
  let date = new Date(splited[2], +splited[1]-1, splited[0]);
  if (+splited[2]!==date.getFullYear() || +splited[1]!==date.getMonth()+1 || +splited[0]!==date.getDate()){
    return {date:true};
  }

  return null;
}
