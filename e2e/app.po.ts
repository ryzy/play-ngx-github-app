import { browser, element, by } from 'protractor';

export class PlayNgGithubPage {
  navigateTo() {
    return browser.get('/');
  }

  public getNavBar() {
    return element(by.css('app-nav'));
  }
}
