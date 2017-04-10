import { browser, element, by } from 'protractor';

import { AppPage } from '../app.po';

export class ErrorPage extends AppPage {
  public ERROR_URL = '/some-error-page';

  public navigateTo() {
    return browser.get(this.ERROR_URL);
  }

  public getHomeLink() {
    return element(by.css('.card-text a'));
  }
}
