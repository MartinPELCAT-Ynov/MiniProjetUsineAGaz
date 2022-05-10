import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  menuOpen: boolean = false;

  @ViewChild('MobileMenu') input!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {
    console.log(this.router);
  }
  ngAfterViewInit(): void {
    console.log(this.input.nativeElement.clientHeight);
  }

  public get menuHeight(): number {
    return this.input.nativeElement.scrollHeight;
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  menuItems: NavItem[] = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
    {
      name: 'Vote',
      path: '/vote',
    },
    {
      name: 'Results',
      path: '/results',
    },
  ];
}
