export default class OpenEndedQuestion extends H5P.EventDispatcher {

  /**
   * Constructor for Open Ended Question
   * @param {Object} params
   * @param {string} params.question Question text
   * @param {string} params.inputType Checkbox or radio
   * @param {Array} params.alternatives Array of strings with answers alternatives
   * @param {number} contentId
   */
  constructor(params, contentId = null) {
    super();
    console.log("parameters", params);

    const {
      question = 'Do you like cake?',
      placeholderText = '',
      inputRows = 1
    } = params;



    this.handleChanged = function (data) {
      this.trigger('changed', data);
    };

    this.createQuestion = function (questionString) {
      const question = document.createElement('div');
      question.textContent = questionString;
      return question;
    };

    this.createInput = function (lines, placeholderString, changeCallback) {
      const input = document.createElement('textarea');
      input.placeholder = placeholderString || '';
      input.rows = lines;
      input.style.resize = 'none';
      input.addEventListener('input', changeCallback);

      return input;
    };

    this.attach = function ($wrapper) {
      const questionWrapper = document.createElement('div');
      const questionElement = this.createQuestion(question);
      const inputElement =
        this.createInput(inputRows, placeholderText, () => {
          this.handleChanged(inputElement.value);
        });

      questionWrapper.appendChild(questionElement);
      questionWrapper.appendChild(inputElement);

      $wrapper.get(0).appendChild(questionWrapper);
    }
  }
}
