export default new class NavbarScroll {
    constructor() {
      this.navbarSelector = '.is-fixed-top';
      this.handler();
    }
  
    handler() {
      $(() => {
          $(document).on('scroll',() => {
            var $nav = $(this.navbarSelector);
            $nav.toggleClass('scrolled', $(document).scrollTop() > $nav.height());
          });
      });
    }
  }();
  