import { Component, HostListener, OnInit } from '@angular/core';
import { isPlatform, MenuController, Platform } from '@ionic/angular';
import categoryData from '../../../assets/company/categories.json';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      title: 'Products',
      icon: 'list',
      path: '/products',
      children: categoryData,
    },
    {
      title: 'About',
      icon: 'information',
      path: '/about',
    },
  ];

  title = 'Home';

  constructor(private plt: Platform, private menuCtrl: MenuController) {}

  ngOnInit() {
    const headerHeight = isPlatform('ios') ? 44 : 56;
    document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`
    );
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  setTitle(title) {
    this.title = title;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }
// para deshabilitar el menu del costado en pantallas grances

  toggleMenu(width) {
    if (width > 768) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }
}
