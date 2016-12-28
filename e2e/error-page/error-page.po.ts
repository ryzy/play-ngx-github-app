import { browser, element, by } from 'protractor';

import { AppPage } from '../app.po';

export class ErrorPage extends AppPage {
  ERROR_URL = '/some-error-page';

  constructor() {
    super();
  }

  navigateTo() {
    return browser.get(this.ERROR_URL);
  }

  getHomeLink() {
    return element(by.css('.card-text a'));
  }
}
