describe('Home', () => {

  beforeEach(() => {
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Registration App';
    expect(subject).toEqual(result);
  });
});
