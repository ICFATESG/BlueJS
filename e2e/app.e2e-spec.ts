import { BlueJSPage } from './app.po';

describe('blue-js App', () => {
  let page: BlueJSPage;

  beforeEach(() => {
    page = new BlueJSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
