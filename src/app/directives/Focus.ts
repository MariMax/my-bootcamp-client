import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class Focus {
  @Input('focus') set focus(value:boolean){
    if (value){
      this.focusAction();
    }
  }

  constructor(public elem: ElementRef) {
  }

  focusAction() {
      setTimeout(()=>this.elem.nativeElement.focus());
  }
}
