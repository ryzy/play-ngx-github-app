import { browser, element, by, ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';

export class AppPage {
  public navigateTo(): webdriver.promise.Promise<void> {
    return browser.get('/');
  }

  public getBrowserUrl(): webdriver.promise.Promise<string> {
    return browser.getCurrentUrl();
  }

  public getNavBar(): ElementFinder {
    return element(by.css('app-nav'));
  }
}
