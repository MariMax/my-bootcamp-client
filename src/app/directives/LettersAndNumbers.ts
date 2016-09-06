import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[letters-and-numbers]'
})
export class LettersAndNumbersDirective {
  constructor() {}

  @HostListener('keypress', ['$event']) onKeyPress($event) {
    var key = $event.keyCode || $event.which;
    key = String.fromCharCode(key);
    var regex = /[a-zA-Z0-9]|\./;
    if (!regex.test(key)) {
      $event.preventDefault();
    }
  }
}
