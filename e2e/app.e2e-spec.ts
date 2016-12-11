import { PlayNgGithubPage } from './app.po';

describe('play-ng-github App', function() {
  let page: PlayNgGithubPage;

  beforeEach(() => {
    page = new PlayNgGithubPage();
  });

  it('should display navigation bar', () => {
    page.navigateTo();
    expect(page.getNavBar().isPresent()).toBe(true);
    expect(page.getNavBar().getText()).toContain('GitHub');
  });
});
