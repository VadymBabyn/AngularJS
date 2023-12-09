import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appWelcomeMessage]'
})
export class WelcomeMessageDirective implements OnInit {
  @Input() roleName: string = "";

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateWelcomeMessage();
  }

  updateWelcomeMessage() {
    this.el.nativeElement.innerHTML = `Вітаю, ${this.roleName}!`;
  }
}
