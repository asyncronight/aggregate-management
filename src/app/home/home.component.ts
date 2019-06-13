import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    (this.renderer.selectRootElement(
      'mat-sidenav-content',
      true
    ) as HTMLElement).style.backgroundImage = 'url("/assets/btp.jpg';
    (this.renderer.selectRootElement(
      'mat-sidenav-content',
      true
    ) as HTMLElement).style.backgroundPosition = 'center';
    (this.renderer.selectRootElement(
      'mat-sidenav-content',
      true
    ) as HTMLElement).style.backgroundSize = 'cover';
  }

  ngOnDestroy() {
    (this.renderer.selectRootElement(
      'mat-sidenav-content',
      true
    ) as HTMLElement).style.backgroundImage = '';
  }
}
