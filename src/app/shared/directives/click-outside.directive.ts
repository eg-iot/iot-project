import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() customClickOutside: EventEmitter<void> = new EventEmitter();

  private clickHandler: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.clickHandler = (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.customClickOutside.emit();
      }
    };

    document.addEventListener('click', this.clickHandler, true);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.clickHandler, true);
  }
}
