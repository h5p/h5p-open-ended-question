/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/entries/dist.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Load library
	H5P.OpenEndedQuestion = __webpack_require__(/*! ../scripts/open-ended-question */ 1).default;

/***/ },
/* 1 */
/*!********************************************!*\
  !*** ./src/scripts/open-ended-question.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xapiGenerator = __webpack_require__(/*! ./xapiGenerator */ 2);
	
	var _xapiGenerator2 = _interopRequireDefault(_xapiGenerator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var OpenEndedQuestion = function (_H5P$EventDispatcher) {
	  _inherits(OpenEndedQuestion, _H5P$EventDispatcher);
	
	  /**
	   * Constructor for Open Ended Question
	   * @param {Object} params
	   * @param {string} params.question Question text or description
	   * @param {string} params.placeholderText Placeholder text for input area
	   * @param {number} params.inputRows Number of rows inside input area
	   * @param {number} contentId
	   */
	  function OpenEndedQuestion(params) {
	    var contentId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    _classCallCheck(this, OpenEndedQuestion);
	
	    // De-structure params into default values
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OpenEndedQuestion).call(this));
	
	    var _params$question = params.question;
	    var question = _params$question === undefined ? 'Do you like cake?' : _params$question;
	    var _params$placeholderTe = params.placeholderText;
	    var placeholderText = _params$placeholderTe === undefined ? '' : _params$placeholderTe;
	    var _params$inputRows = params.inputRows;
	    var inputRows = _params$inputRows === undefined ? 1 : _params$inputRows;
	
	
	    _this.xApiGenerator = new _xapiGenerator2.default(question);
	
	    /**
	     * Create open ended question element
	     * @param {string} questionString The open ended question text
	     * @return {Element} The question element
	     */
	    _this.createQuestion = function (questionString) {
	      var question = document.createElement('div');
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
	    _this.createInput = function (lines, placeholderString) {
	      var input = document.createElement('textarea');
	      input.placeholder = placeholderString || '';
	      input.rows = lines;
	      input.style.resize = 'none';
	
	      return input;
	    };
	
	    /**
	     * Attach library to wrapper
	     * @param {jQuery} $wrapper
	     */
	    _this.attach = function ($wrapper) {
	      var _this2 = this;
	
	      var questionWrapper = document.createElement('div');
	      questionWrapper.className = 'h5p-open-ended-question';
	
	      var questionElement = this.createQuestion(question);
	      var inputElement = this.createInput(inputRows, placeholderText);
	      inputElement.className = 'h5p-open-ended-question-input';
	      inputElement.addEventListener('input', function () {
	        var xApiTemplate = _this2.createXAPIEventTemplate('interacted');
	        var xApiEvent = _this2.xapiGenerator.generateXApi(xApiTemplate, inputElement.value);
	        _this2.trigger('xAPIchanged', xApiEvent);
	      });
	
	      questionWrapper.appendChild(questionElement);
	      questionWrapper.appendChild(inputElement);
	
	      $wrapper.get(0).appendChild(questionWrapper);
	    };
	    return _this;
	  }
	
	  return OpenEndedQuestion;
	}(H5P.EventDispatcher);
	
	exports.default = OpenEndedQuestion;

/***/ },
/* 2 */
/*!**************************************!*\
  !*** ./src/scripts/xapiGenerator.js ***!
  \**************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Generate xAPI statements
	 */
	var xApiGenerator = function () {
	  function xApiGenerator(question) {
	    _classCallCheck(this, xApiGenerator);
	
	    // Set up default response object
	    this.event = {
	      description: {
	        'en-US': question // We don't actually know the language of the question
	      },
	      type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
	      interactionType: 'fill-in'
	    };
	  }
	
	  /**
	   * Extend xAPI template
	   * @param {Event} xApiTemplate xAPI event template
	   * @param {string} answer Answer to open ended question
	   * @return {Event} Extended xAPI event
	   */
	
	
	  _createClass(xApiGenerator, [{
	    key: 'generateXApi',
	    value: function generateXApi(xApiTemplate, answer) {
	      var statement = xApiTemplate.data.statement;
	      Object.assign(statement, {
	        result: {
	          response: answer
	        }
	      });
	
	      if (statement.object) {
	        var definition = statement.object.definition;
	        Object.assign(definition, this.event);
	      }
	
	      return xApiTemplate;
	    }
	  }]);
	
	  return xApiGenerator;
	}();
	
	exports.default = xApiGenerator;

/***/ }
/******/ ]);
//# sourceMappingURL=dist.js.map