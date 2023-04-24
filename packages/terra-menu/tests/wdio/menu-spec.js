const ignoredA11y = {
  'aria-required-parent': { enabled: false }, 'aria-required-children': { enabled: false },
};

Terra.describeViewports('Menu', ['medium'], () => {
  it('displays a default Menu', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/default-menu');
    $('#default-button').click();
    expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
    Terra.validates.element('default', { selector: '#root' });
  });

  describe('Menu-Bounded', () => {
    it('displays a bounded menu', () => {
      browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/bounded-menu');
      $('#bounded-button').click();
      expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
      Terra.validates.element('bounded', { rules: ignoredA11y });
    });

    it('opens submenu', () => {
      $('.TestNestedMenu').click();
      expect($('.TestNestedMenuContent').isFocused()).toBeTruthy();
      Terra.validates.element('open submenu', { selector: '#root' });
    });
  });

  it('displays a Menu with Small Height', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/small-menu');
    $('#small-menu-button').click();
    Terra.validates.element('small height', { selector: '#root' });
  });

  it('displays a Menu with Medium Height', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/medium-menu');
    $('#medium-menu-button').click();
    Terra.validates.element('medium height', { selector: '#root', rules: ignoredA11y });
  });

  it('displays a Menu with Large Height', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/large-menu');
    $('#large-menu-button').click();
    Terra.validates.element('large height', { selector: '#root', rules: ignoredA11y });
  });

  it('displays a non-selectable menu', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/non-selectable-menu');
    $('#non-selectable-menu-button').click();
    Terra.validates.element('non selectable', { selector: '#root' });
  });

  it('displays a Menu-Selectable', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/selectable-menu');
    $('#selectable-menu-button').click();
    expect($('li:first-child[role="menuitemradio"]').isFocused()).toBeTruthy();
    $('.TestGroupItem3').click();
    expect($('li:last-child[aria-checked="true"][role="menuitemradio"]').isFocused()).toBeTruthy();

    Terra.validates.element('selectable', { selector: '#root', rules: ignoredA11y });
  });

  describe('Menu-Selectable with Varying Items', () => {
    it('displays a selectable menu with varying items', () => {
      browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/selectable-and-unselectable-items-menu');
      $('#default-button').click();
      Terra.validates.element('with varying items', { selector: '#root' });
    });

    it('selects an item and maintains selection after menu has been reopened', () => {
      $('.TestSelectableItem').click();
      expect($('#default-button').isFocused()).toBeTruthy();
      $('#default-button').click();
      expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
      Terra.validates.element('maintained selection after reopen', { selector: '#root' });
    });
  });

  it('displays a Menu with a submenu', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/sub-menu');
    $('#sub-menu-button').click();
    expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
    Terra.validates.element('main menu', { selector: '#root' });

    $('.TestNestedMenu').click();
    expect($('.TestNestedMenuContent').isFocused()).toBeTruthy();
    Terra.validates.element('menu with submenu', { selector: '#root' });
    browser.keys('Escape');
  });

  it('focuses on back button in submenu', () => {
    browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/sub-menu');
    $('#sub-menu-button').click();
    expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
    Terra.validates.element('main menu', { selector: '#root' });

    $('.TestNestedMenu').click();
    browser.keys(['Shift', 'Tab']);
    expect($('[role="button"][aria-label="Back"]').isFocused()).toBeTruthy();
    Terra.validates.element('navigating to back button', { selector: '#root' });
    browser.keys('Escape');
  });

  describe('Menu and submenu with long header title', () => {
    it('displays Menu with submenu and long header title', () => {
      browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/sub-menu-long-title');
      $('#sub-menu-button').click();
      expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
      Terra.validates.element('main menu long header', { selector: '#root' });

      $('.TestNestedMenu').click();
      expect($('.TestNestedMenuContent').isFocused()).toBeTruthy();
      Terra.validates.element('submenu long header', { selector: '#root' });
      browser.keys('Escape');
    });
  });

  describe('Menu Keyboard Navigation-Arrow Keys', () => {
    it('navigates Menu using  Keyboard Navigation-Arrow Keys', () => {
      browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/sub-menu');
      $('#sub-menu-button').click();
      $('li:first-child[role="menuitem"]').isFocused();

      // it does not do anything when left arrow is pressed on the first layer
      browser.keys(['ArrowLeft']);
      expect($('li:first-child[class*="item"][role="menuitem"]').isFocused()).toBeTruthy();

      Terra.validates.element('main menu remains open', { selector: '#root' });

      // it displays the submenu on right arrow
      browser.keys(['ArrowDown', 'ArrowRight']);
      expect($('.TestNestedMenuContent').isFocused()).toBeTruthy();

      Terra.validates.element('navigated to submenu using arrow keys', { selector: '#root' });

      // it returns to the item in main menu on left arrow
      browser.keys(['ArrowLeft']);
      expect($('.TestNestedMenu').isFocused()).toBeTruthy();

      Terra.validates.element('returned to main menu using arrow keys', { selector: '#root' });
      browser.keys('Escape');
    });
  });

  describe('Menu Keyboard Navigation-Enter Key', () => {
    it('Menu Keyboard Navigation-Enter Key', () => {
      browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/sub-menu');
      $('#sub-menu-button').click();
      expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();

      // it displays the submenu on enter
      browser.keys(['ArrowDown', 'Enter']);
      expect($('.TestNestedMenuContent').isFocused()).toBeTruthy();

      Terra.validates.element('navigated to submenu using enter key', { selector: '#root' });

      // it returns to the item in main menu on enter
      browser.keys(['Shift', 'Tab']);
      browser.keys(['Enter']);
      expect($('.TestNestedMenu').isFocused()).toBeTruthy();

      Terra.validates.element('returned to main menu using enter key', { selector: '#root' });
    });
  });

  describe('Menu With Custom Icons', () => {
    it('Menu With Custom Icons', () => {
      browser.url('/raw/tests/cerner-terra-framework-docs/menu/menu/custom-icons-menu');
      $('#custom-icons-button').click();
      expect($('li:first-child[role="menuitem"]').isFocused()).toBeTruthy();
      Terra.validates.element('shows custom icons in the menu', { selector: '#root' });
    });
  });
});
