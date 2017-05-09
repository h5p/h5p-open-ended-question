import 'expose?H5P!exports?H5P!h5p-view';
import OpenEndedQuestion from '../src/scripts/open-ended-question';

describe('Open Ended Question', () => {
  const params = {
    "question": "Do you like cake ?",
    "placeholderText": "No! I like turtles",
    "inputRows": 2
  };

  const $body = H5P.jQuery('body');
  const openEndedQuestion = new OpenEndedQuestion(params);
  openEndedQuestion.attach($body);

  it('should attach to wrapper', () => {
    const qElement = document.querySelector('.h5p-open-ended-question');
    expect(qElement.parentNode).toBe($body.get(0));
  });

  it('should trigger changed event on input change', (done) =>{
    openEndedQuestion.on('xAPI', (e) => {
      expect(e).toBeDefined();
      done();
    });

    const inputElement = document.querySelector('.h5p-open-ended-question-input');
    inputElement.textContent = 'changed input';
    const event = new KeyboardEvent('blur');
    inputElement.dispatchEvent(event);
  });

  describe('Html', () => {
    it('should create a question', () => {
      const questionElement = openEndedQuestion.createQuestion('question');
      expect(questionElement).toBeDefined();
      expect(questionElement.textContent).toBe('question');
    });

    it('should parse html in for question', () => {
      const questionElement = openEndedQuestion.createQuestion('Don&#039;t you like cake ?');
      expect(questionElement).toBeDefined();
      expect(questionElement.textContent).toBe('Don\'t you like cake ?');
    });

    it('should create an input', () => {
      const inputElement = openEndedQuestion.createInput(3, 'placeholder');
      expect(inputElement.placeholder).toMatch('placeholder');
      expect(inputElement.rows).toBe(3);
    });

    it('should not require a placeholder', () => {
      const inputElement = openEndedQuestion.createInput(1);
      expect(inputElement.placeholder).toBe('');
    })
  });

  // TODO: Add test for reattaching content type
});
