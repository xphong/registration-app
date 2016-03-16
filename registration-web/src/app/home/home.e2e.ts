describe('App', () => {

  beforeEach(() => {
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Weather App';
    expect(subject).toEqual(result);
  });

  it('should have input text box', () => {
    let subject = element(by.css('.weather input[type=text]')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have submit button', () => {
    let subject = element(by.css('.weather button[type=submit]')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should display error message for forecast not found', () => {
    let textBox = element(by.css('.weather input[type=text]'));
    let submitButton = element(by.css('.weather button[type=submit]'));
    let table;

    textBox.clear();
    textBox.sendKeys('12313211231321').then(() => {
      submitButton.click();

      browser.sleep(1000);

      browser.findElement(by.css('.help-block')).then((el) => {
        expect(el.isDisplayed()).toBe(true);
      });

      table = element(by.css('.table')).isPresent();
      expect(table).toEqual(false)
    });
  });

  it('should search city for forecast on click', () => {
    let textBox = element(by.css('.weather input[type=text]'));
    let submitButton = element(by.css('.weather button[type=submit]'));
    let result  = true;

    textBox.clear();
    textBox.sendKeys('Toronto').then(() => {
      submitButton.click();

      browser.sleep(500);

      browser.findElement(by.css('.table')).then((el) => {
        expect(el.isDisplayed()).toBe(result);
      });
    });

  });

  it('should search city for forecast on enter', () => {
    let textBox = element(by.css('.weather input[type=text]'));
    let submitButton = element(by.css('.weather button[type=submit]'));
    let result  = true;

    textBox.clear();
    textBox.sendKeys('Toronto').then(() => {
      textBox.sendKeys(protractor.Key.ENTER);

      browser.sleep(500);

      browser.findElement(by.css('.table')).then((el) => {
        expect(el.isDisplayed()).toBe(result);
      });
    });
  });

});
