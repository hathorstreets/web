import 'cookieconsent';

export default new class Cookie {
  constructor() {
    this.backgroundColor = '#794ea4';
    this.buttonColor = '#fff';
    this.message = 'We used cookies.';
    this.dismiss = 'Accept';
    this.handler();
  }

  handler() {
    $(() => {
      this.initCookie();
    });
  }

  initCookie() {
    window.cookieconsent.initialise({
      palette: {
        popup: { background: this.backgroundColor },
        button: { background: this.buttonColor },
      },
      showLink: true,
      theme: 'classic',
      position: 'bottom',
      content: {
        message: this.message,
        dismiss: this.dismiss,
        link: this.link,
        href: this.href,
      },
    });
  }
}();
