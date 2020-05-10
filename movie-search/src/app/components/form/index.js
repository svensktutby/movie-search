class FormUI {
  constructor() {
    this.form = document.forms['search-form'];
    this.clear = this.form.querySelector('#form-clear');
  }

  init() {
    this.form.focus();
    this.clear.addEventListener('click', () => this.form.reset());
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}

const form = new FormUI();

export default form;
