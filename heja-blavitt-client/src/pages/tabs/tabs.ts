import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {NewsPage} from "../news/news";
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
