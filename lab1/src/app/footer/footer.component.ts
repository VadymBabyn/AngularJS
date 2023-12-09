import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  activeItem: string = '';
  @Input() menuItems: {label:string; active:boolean}[]=[];
  @Output() setActiveEvent = new EventEmitter<{label:string; active:boolean}>();

  setActive(item:{label:string; active:boolean}): void{
    const index = this.menuItems.findIndex(menuItem => menuItem.label === item.label);
    if (index!==-1){
      this.menuItems[index].active=!this.menuItems[index].active;
      this.setActiveEvent.emit(this.menuItems[index]);
    }
  }
}
