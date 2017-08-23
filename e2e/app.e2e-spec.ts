import { AngularfrontendPage } from './app.po';

describe('angularfrontend App', function() {
  let page: AngularfrontendPage;

  beforeEach(() => {
    page = new AngularfrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
