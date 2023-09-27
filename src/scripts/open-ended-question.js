import './styles/open-ended-question.css';
import xApiGenerator from './xapiGenerator';

export default class OpenEndedQuestion extends H5P.EventDispatcher {

  /**
   * Constructor for Open Ended Question
   * @param {Object} params
   * @param {string} params.question Question text or description
   * @param {string} params.placeholderText Placeholder text for input area
   * @param {number} params.inputRows Number of rows inside input area
   * @param {number|*} contentId
   * @param {Object} contentData
   */
  constructor(params, contentId = null, contentData = {}) {
    super();

    // De-structure params into default values
    const {
      question = 'Do you like cake?',
      placeholderText = '',
      inputRows = 1
    } = params;

    this.currentInput = '';

    this.xApiGenerator = new xApiGenerator(question);

    /**
     * Create open ended question element
     * @param {string} questionString The open ended question text
     * @return {Element} The question element
     */
    this.createQuestion = function (questionString) {
      const question = document.createElement('div');
      question.className = 'h5p-open-ended-question-text';
      question.innerHTML = questionString;
      return question;
    };

    /**
     * Create input are for question
     *
     * @param {number} lines Lines of input
     * @param {string} [placeholderString] Optional placeholder
     * @return {Element} The input element
     */
    this.createInput = function (lines, placeholderString) {
      const input = document.createElement('textarea');
      input.innerHTML = placeholderString || ''; // Convert HTML to Text
      input.placeholder = input.innerText; // and use as placeholder
      input.textContent = this.currentInput;
      input.rows = lines;
      input.style.resize = 'none';

      return input;
    };

    /**
     * Attach library to wrapper
     * @param {jQuery} $wrapper
     */
    this.attach = function ($wrapper) {
      const questionWrapper = document.createElement('div');
      questionWrapper.classList.add('h5p-open-ended-question');

      const questionElement = document.createElement('div');
      questionElement.classList.add('h5p-open-ended-question-question');
      questionElement.classList.add('h5p-subcontent-question');

      const questionText = this.createQuestion(question);
      questionElement.appendChild(questionText);

      const content = document.createElement('div');
      content.classList.add('h5p-open-ended-question-content');
      content.classList.add('h5p-subcontent-body');

      const inputElement = this.createInput(inputRows, placeholderText);
      inputElement.className = 'h5p-open-ended-question-input';
      inputElement.addEventListener('blur', () => {
        let xApiTemplate = this.createXAPIEventTemplate('interacted');
        const xApiEvent = this.xApiGenerator.generateXApi(xApiTemplate, inputElement.value);
        this.currentInput = inputElement.value;
        this.trigger(xApiEvent);
      });

      inputElement.addEventListener('keydown', () => this.trigger('changed'));

      content.appendChild(inputElement);

      questionWrapper.appendChild(questionElement);
      questionWrapper.appendChild(content);

      $wrapper.get(0).appendChild(questionWrapper);

      this.inputElement = inputElement;
    };

    /**
     * Reset the task, clearing the input element.
     */
    this.resetTask = function () {
      this.currentInput = '';

      if (this.inputElement) {
        this.inputElement.value = '';
      }
    };

    /**
     * Get current state
     * @return {string}
     */
    this.getCurrentState = function () {
      return this.currentInput;
    };

    /**
     * Restore previous state
     */
    this.restorePreviousState = function () {
      if (!contentData.previousState) {
        return;
      }
      this.currentInput = contentData.previousState;
    };

    this.restorePreviousState();
  }
}
