import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuOpen = false;
  expanded: boolean[] = [false, false, false, false];
  isLoaded = false;

  ngOnInit(): void {
    // Hide loader after 2.2s (2s animation + 0.2s buffer for fade)
    setTimeout(() => {
      this.isLoaded = true;
    }, 2200);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleService(index: number) {
    this.expanded[index] = !this.expanded[index];
  }
}
