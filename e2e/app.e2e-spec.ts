import { TimeTreePage } from './app.po';

describe('time-tree App', function() {
  let page: TimeTreePage;

  beforeEach(() => {
    page = new TimeTreePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
