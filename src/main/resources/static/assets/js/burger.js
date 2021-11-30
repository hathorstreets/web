export default new class Burger {
    constructor() {
      this.burger = '.navbar-burger';
      this.target = 'data-target';
      this.class = 'is-active';
      this.handler();
    }
  
    handler() {
      $(() => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = $(this.burger);
  
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
          // Add a click event on each of them
          $navbarBurgers.on('click', (event) => {
            const $element = $(event.currentTarget);
            const target = $element.attr(this.target);
            $element.toggleClass(this.class);
            $(target).toggleClass(this.class);
          });
        }
      });
    }
  }();
  