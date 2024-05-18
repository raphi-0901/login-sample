import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'fixed bg-primary py-2 md:py-6 w-full top-0 z-10'
  }
})
export class HeaderComponent implements OnInit {

  menuOpen = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
