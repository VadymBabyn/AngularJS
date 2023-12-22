import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('authModalTemplate', { static: true }) authModalTemplate!: TemplateRef<any>;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(form: NgForm) {
    // Обробка даних форми тут
    // Закриття модального вікна: this.modalRef.hide();
  }
  title = 'ToDoAngular';
  performSearch()
  {
    console.log("Searching")
  }
  profile_info()
  {
    console.log("opened info profile")
  }
}
