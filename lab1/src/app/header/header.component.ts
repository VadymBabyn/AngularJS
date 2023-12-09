import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  showGreetingFlag = false;
  showListWithPhotos = false;
  mainData: string = "Привіт, світ!";
  @Input() currentState: 'empty' | 'list' | 'photo' = "empty";
  @Output() stateChange = new EventEmitter<'empty'|'list'|'photo'>();

  dataItems = [
    { type: 'Тип 1', title: 'Майкл Кітон', subtitle: 'Batman', rating: 2, imageSrc: 'assets/images/1.jpg' },
    { type: 'Тип 2', title: 'Крістіан Бейл', subtitle: 'Batman', rating: 1,imageSrc: 'assets/images/2.jpg'},
  ];

  showGreeting() {
    this.showGreetingFlag = true;
  }

  toggleView() {
    if (this.currentState === 'empty') {
      this.currentState = 'list';
      this.stateChange.emit(this.currentState);
    } else if (this.currentState === 'list') {
      this.currentState = 'photo';
      this.stateChange.emit(this.currentState);
    } else {
      this.currentState = 'empty';
      this.stateChange.emit(this.currentState);
    }
  }
}
