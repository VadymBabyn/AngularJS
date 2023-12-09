import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrls: ['./left-nav-bar.component.css']

})
export class LeftNavBarComponent {
  @Input() menuItems:{label: string; active:boolean}[]=[];
  @Output() setActiveEvent = new EventEmitter<{label:string; active:boolean}>();

setActive(item:{label:string; active:boolean}):void{

  this.setActiveEvent.emit(item);
}

  activeItem: string = '';
  activeButtons: Set<string> = new Set<string>();
   isActive(button: string): boolean {
    return this.activeButtons.has(button);
  }

  toggleButton(button: string): void {
    this.activeItem = button;
  if (this.activeButtons.has(button)) {
      this.activeButtons.delete(button);
    } else {
      this.activeButtons.add(button);
    }
  }


}

