class FormUI {
  constructor() {
    this.form = document.forms['search-form'];
    this.clear = this.form.querySelector('#form-clear');
    this.input = this.form.querySelector('#form-input');
    this.submitBtn = this.form.querySelector('#form-submit');
  }

  init(query) {
    this.input.focus();
    this.clear.addEventListener('click', () => this.form.reset());
    this.inputValue = query;
  }

  get inputValue() {
    return this.input.value;
  }

  set inputValue(value) {
    this.input.value = value;
  }
}

const form = new FormUI();

export default form;
