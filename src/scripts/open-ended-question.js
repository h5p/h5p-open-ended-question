export default class OpenEndedQuestion extends H5P.EventDispatcher {

  /**
   * Constructor for Open Ended Question
   * @param {Object} params
   * @param {string} params.question Question text or description
   * @param {string} params.placeholderText Placeholder text for input area
   * @param {number} params.inputRows Number of rows inside input area
   * @param {number} contentId
   */
  constructor(params, contentId = null) {
    super();

    // De-structure params into default values
    const {
      question = 'Do you like cake?',
      placeholderText = '',
      inputRows = 1
    } = params;

    /**
     * Create open ended question element
     * @param {string} questionString The open ended question text
     * @return {Element} The question element
     */
    this.createQuestion = function (questionString) {
      const question = document.createElement('div');
      question.textContent = questionString;
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
      input.placeholder = placeholderString || '';
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
      questionWrapper.className = 'h5p-open-ended-question';

      const questionElement = this.createQuestion(question);
      const inputElement = this.createInput(inputRows, placeholderText);
      inputElement.className = 'h5p-open-ended-question-input';
      inputElement.addEventListener('input', () => {
        this.trigger('changed', inputElement.value);
      });

      questionWrapper.appendChild(questionElement);
      questionWrapper.appendChild(inputElement);

      $wrapper.get(0).appendChild(questionWrapper);
    }
  }
}
