import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {entries} from "lodash";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'fixed w-full top-0 z-10'
  }
})
export class HeaderComponent implements OnInit, AfterViewInit {

  menuOpen = false;

  @ViewChild('nav') nav: ElementRef;
  resizeObserver: ResizeObserver

  ngAfterViewInit() {
    // needed for resizing window
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.height !== 0) {
          document.documentElement.style.setProperty('--nav-height', `${this.nav.nativeElement.offsetHeight}px`);
        }
      }
    });

    this.resizeObserver.observe(this.nav.nativeElement);
  };

  constructor(public authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect()
  }

  ngOnInit(): void {
  }
}
