export default new class Modal {
  constructor() {
    this.opener           = '.js-modal-open';
    this.allModal         = '.modal';
    this.modalOpenAttr    = 'data-modal';
    this.dataTitle        = 'data-title';
    this.dataImage        = 'data-image';    
    this.dataDescription  = 'data-description';
    this.modalTitle       = '#interpret-title';
    this.modalImage       = '#interpret-image';
    this.modalDescription = '#interpret-description';
    this.closeModal       = '.js-modal-close';
    this.background       = '.modal-background';
    this.handler();
  }

  handler() {
    $(() => {
      $(this.opener).on('click', (event) => {
        event.preventDefault();
        $(this.allModal).removeClass('is-active');

        const opener = event.currentTarget;
        const modal = $(opener).attr(this.modalOpenAttr);
        const title = $(opener).attr(this.dataTitle);
        const image = $(opener).attr(this.dataImage);
        const description = $(opener).attr(this.dataDescription);

        $(this.modalTitle).text(title);
        $(this.modalImage).attr('src',image);
        $(this.modalDescription).html(description);

        $(modal).addClass('is-active');
      });
      $(`${this.closeModal},${this.background}`).on('click', (event) => {
        event.preventDefault();
        $(event.target).parents('.modal').toggleClass('is-active');
      });
    });
  }
}();