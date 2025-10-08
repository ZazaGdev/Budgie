import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Renderer2, signal } from '@angular/core';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent implements OnInit {
  isOpen = signal(true);
  renderer = inject(Renderer2);

  menuItems: MenuItem[] = [
    { icon: '🏠', label: 'Dashboard', route: '/dashboard' },
    { icon: '📊', label: 'Categories', route: '/categories' },
    { icon: '⚙️', label: 'Settings', route: '/settings' },
  ];

  ngOnInit() {
    // Set initial width
    this.updateSidebarWidth();
  }

  toggleSidebar() {
    this.isOpen.update(val => !val);
    this.updateSidebarWidth();
  }

  private updateSidebarWidth() {
    const newWidth = this.isOpen() ? '250px' : '70px';

    document.documentElement.style.setProperty('--current-sidebar-width', newWidth);
  }
}
