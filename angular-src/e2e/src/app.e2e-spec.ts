import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import {  by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Personal Budget');
  });

  it('should display login button', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('LOGIN');
  });

  it('should display register button', () => {
    page.navigateTo();
    expect(page.getRegisterButton().getText()).toEqual('REGISTER');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
