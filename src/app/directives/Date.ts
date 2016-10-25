import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[custom-date]'
})
export class CustomDate {
  constructor(private el: ElementRef) {
  }

  _getCaretPosition(oField) {

    // Initialize
    let iCaretPos = 0;

    // IE Support
    if (document.selection) {

      // Set focus on the element
      oField.focus();

      // To get cursor position, get empty selection range
      const oSel = document.selection.createRange();

      // Move selection start to 0 position
      oSel.moveStart('character', -oField.value.length);

      // The caret position is selection length
      iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
      iCaretPos = oField.selectionStart;

    // Return results
    return iCaretPos;
  }

  _validate(value) {
    const regex = [new RegExp('^[0-9]{1,2}$'), new RegExp('^[0-9]{1,2}[\.]+$'), new RegExp('^[0-9]{1,2}[\.]+[0-9]{1,2}$'),
      new RegExp('^[0-9]{1,2}[\.]+[0-9]{1,2}[\.]+$'), new RegExp('^[0-9]{1,2}[\.]+[0-9]{1,2}[\.]+[0-9]{1,4}$')];
    return regex.some(i=> i.test(value));
  }

  @HostListener('keypress', ['$event']) onKeyPress($event) {
    const caretPosition = this._getCaretPosition(this.el.nativeElement);
    const value = this.el.nativeElement.value;
    const key = $event.key;
    const newValue = [value.slice(0, caretPosition), key, value.slice(caretPosition)].join('');
    if (!this._validate(newValue)) {
      $event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste($event) {
    const caretPosition = this._getCaretPosition(this.el.nativeElement);
    const value = this.el.nativeElement.value;
    const key = $event.clipboardData.getData('Text');
    const newValue = [value.slice(0, caretPosition), key, value.slice(caretPosition)].join('');
    if (!this._validate(newValue)) {
      $event.preventDefault();
    }
  }

}
