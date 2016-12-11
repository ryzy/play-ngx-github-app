import { PlayNgGithubPage } from './app.po';

describe('play-ng-github App', function() {
  let page: PlayNgGithubPage;

  beforeEach(() => {
    page = new PlayNgGithubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
