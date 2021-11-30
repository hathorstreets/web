import 'datatables.net';
import 'datatables.net-bulma';

export default new class Data {
    constructor() {
      this.table = '.dataTable';
      this.handler();
    }
  
    handler() {
      $(() => {
        $(this.table).dataTable({
          'paging':   false,
          'info':     false,
          language: {
            search: "",
            searchPlaceholder: "Search..."
          }}
        );
      })
    }
  }();
  