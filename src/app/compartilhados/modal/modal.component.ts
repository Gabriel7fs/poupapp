import { afterRender, Component, ElementRef, model, OnInit, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modal = viewChild.required<ElementRef<HTMLDialogElement>>('modal');

  open = model(false);

  constructor() {
    afterRender(() => {
      if (this.open()) {
        this.modal().nativeElement.showModal();
      } else {
        this.modal().nativeElement.close();
      }
    });
  }

  closeModal() {
    this.open.set(false);
  }

  ngOnInit() {
  }

}
