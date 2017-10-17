import { ErrorPage } from './error-page.po';

describe('Error Page', () => {
  let page: ErrorPage;

  beforeEach(() => {
    page = new ErrorPage();
  });

  it('should display error 404', () => {
    page.navigateTo();
    expect(page.getNavBar().isPresent()).toBe(true as any);
  });

  it('should offer link and navigate to main page', () => {
    page.navigateTo();
    expect(page.getBrowserUrl()).toContain(page.ERROR_URL);

    // look up for home link
    const homeLink = page.getHomeLink();
    expect(homeLink.isPresent()).toBe(true as any);

    // navigate to home page and check the url
    homeLink.click();
    expect(page.getBrowserUrl()).not.toContain(page.ERROR_URL);
  });
});
