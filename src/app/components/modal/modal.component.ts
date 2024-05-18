import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit, OnDestroy{
  @ViewChild('dialog') dialog: ElementRef;
  @Output() onCloseModal: EventEmitter<null> = new EventEmitter<null>();
  @Output() onShowModal: EventEmitter<null> = new EventEmitter<null>();
  mutationObserver: MutationObserver
  resizeObserver: ResizeObserver

  ngAfterViewInit() {
    // needed for animation
    this.mutationObserver = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === 'open') {
          this.dialog.nativeElement.classList.toggle('open', this.dialog.nativeElement.open)

          if(this.dialog.nativeElement.open) {
            this.onShowModal.emit()
          } else {
            this.onCloseModal.emit()
          }
        }
      }
    });

    // needed for resizing window
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if(entry.contentRect.height !== 0) {
          this.dialog.nativeElement.style.setProperty('--item-height', `${(this.dialog.nativeElement.offsetHeight/2)}px`);
        }
      }
    });

    this.resizeObserver.observe(this.dialog.nativeElement);
    this.mutationObserver.observe(this.dialog.nativeElement, {
      attributes: true,
      attributeFilter: ['open']
    });
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect()
    this.resizeObserver.disconnect()
  }

  close() {
    this.dialog.nativeElement.close()
  }

  open() {
    this.dialog.nativeElement.showModal()
  }
}
