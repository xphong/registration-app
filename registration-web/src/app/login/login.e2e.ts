describe('Login', () => {

  beforeEach(() => {
    browser.get('/#/login');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Registration App';
    expect(subject).toEqual(result);
  });

  it('should have input text box', () => {
    let subject = element(by.css('.registration input[type=text]')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

  it('should have submit button', () => {
    let subject = element(by.css('.registration button[type=submit]')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

  it('should display invalid error message on login', () => {
    let usernameTextBox = element(by.id('login-username-textbox'));
    let passwordTextBox = element(by.id('login-password-textbox'));
    let submitButton = element(by.id('login-submit'));
    let result = true;

    let randomUsername = 'Test' + Math.floor(Math.random() * 9999) + 1;

    usernameTextBox.clear();
    passwordTextBox.clear();

    usernameTextBox.sendKeys(randomUsername).then(() => {
      passwordTextBox.sendKeys('Testpassword1').then(() => {
        submitButton.click();

        browser.sleep(500);

        browser.findElement(by.css('.help-block.error')).then((el) => {
          expect(el.isDisplayed()).toBe(result);
        });
      });
    });
  });

});
