import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navigation bar', () => {
    page.navigateTo();
    expect(page.getNavBar().isPresent()).toBe(true as any);
    expect(page.getNavBar().getText()).toContain('GitHub');
  });
});
