describe('Register', () => {

  beforeEach(() => {
    browser.get('/#/register');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Registration App';
    expect(subject).toEqual(result);
  });

  it('should have input text box', () => {
    let subject = element(by.css('.registration input[type=text]')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have submit button', () => {
    let subject = element(by.css('.registration button[type=submit]')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should display error message for username validation', () => {
    let textBox = element(by.id('register-username-textbox'));

    textBox.clear();
    textBox.sendKeys('a').then(() => {
      browser.findElement(by.css('.help-block.username')).then((el) => {
        expect(el.isDisplayed()).toBe(true);
      });
    });
  });

  it('should display error message for password validation', () => {
    let textBox = element(by.id('register-password-textbox'));

    textBox.clear();
    textBox.sendKeys('a').then(() => {
      browser.findElement(by.css('.help-block.password')).then((el) => {
        expect(el.isDisplayed()).toBe(true);
      });
    });
  });

  it('should register user on click', () => {
    let usernameTextBox = element(by.id('register-username-textbox'));
    let passwordTextBox = element(by.id('register-password-textbox'));
    let submitButton = element(by.id('register-submit'));
    let result = true;

    let randomUsername = 'Test' + Math.floor(Math.random() * 9999) + 1;

    usernameTextBox.clear();
    passwordTextBox.clear();

    usernameTextBox.sendKeys(randomUsername).then(() => {
      passwordTextBox.sendKeys('Testpassword1').then(() => {
        submitButton.click();

        browser.sleep(500);

        browser.findElement(by.css('.help-block.success')).then((el) => {
          expect(el.isDisplayed()).toBe(result);
        });
      });
    });
  });

});
