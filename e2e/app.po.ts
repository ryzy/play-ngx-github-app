import { browser, element, by } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getBrowserUrl() {
    return browser.getCurrentUrl();
  }

  public getNavBar() {
    return element(by.css('app-nav'));
  }
}
