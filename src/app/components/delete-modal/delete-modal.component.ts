import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input({required: true}) public title: string;
  @Input({required: true}) public message: string;
  @Input({required: true}) public confirmText: string;
  @Output() public onConfirm: EventEmitter<any> = new EventEmitter();  // Variable to store modal visibility
  public visible: boolean = false;

  public showModal() {
    this.visible = true;
  }

  public hideModal() {
    this.visible = false;
  }
}
