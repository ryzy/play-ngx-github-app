import { browser, element, by, ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';

import { AppPage } from '../app.po';

export class ErrorPage extends AppPage {
  public ERROR_URL: string = '/some-error-page';

  public navigateTo(): webdriver.promise.Promise<void> {
    return browser.get(this.ERROR_URL);
  }

  public getHomeLink(): ElementFinder {
    return element(by.css('.card-text a'));
  }
}
