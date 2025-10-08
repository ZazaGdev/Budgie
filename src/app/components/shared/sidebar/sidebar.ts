import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule], // ✅ ADDED: Import RouterModule for routerLink
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent {
  isSidebarOpen = true;
  // Component logic here
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
