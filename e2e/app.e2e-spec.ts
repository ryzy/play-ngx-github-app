import { AppPage } from './app.po';

describe('App', function() {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navigation bar', () => {
    page.navigateTo();
    expect(page.getNavBar().isPresent()).toBe(true);
    expect(page.getNavBar().getText()).toContain('GitHub');
  });
});
