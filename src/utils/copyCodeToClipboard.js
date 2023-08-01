
class CustomCodeTool {
  static get toolbox() {
    return {
      title: 'Code',
      icon: '<svg>...</svg>', // Replace with an appropriate icon for the code block
    };
  }

  constructor({ data, api }) {
    this.data = data;
    this.api = api;
    const preElement = document.createElement('pre');
    preElement.classList.add('code__ele');

    const codeElement = document.createElement('code');
    codeElement.classList.add('code-block__code');
    this.preElement.appendChild(codeElement);


    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('code-block');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('code-block__textarea');
    this.textarea.addEventListener('input', this.onValueChanged.bind(this));
    this.textarea.value = this.data.code || '';
    this.wrapper.appendChild(this.textarea);

    this.copyButton = document.createElement('button');
    this.copyButton.textContent = 'Copy';
    this.copyButton.classList.add('code__copy__button');
    this.copyButton.addEventListener('click', this.copyCodeToClipboard.bind(this));
    this.wrapper.appendChild(this.copyButton);
  }

  render() {
    return this.wrapper;
  }

  copyCodeToClipboard() {
    this.textarea.select();
    document.execCommand('copy');
  }

  onValueChanged() {
    const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
    const newData = { ...this.data, code: this.textarea.value };
    this.api.blocks.insert('code', newData, {}, currentBlockIndex);
    this.api.blocks.delete(currentBlockIndex);
  }

  save() {
    return {
      code: this.textarea.value,
    };
  }
}


export default CustomCodeTool;
