export const Quiz = [
  {
    question: 'Which of the following is correct about Services?',
    questionId: 0,
    options: [
      {
        option: 'Angular 2 Services are a set of code that can be shared by different components of an application.',
        optionId: 1001,
        isAnswer: true
      }, {
        option: 'Angular 2 Services cannot be used across multiple applications.',
        optionId: 1002,
        isAnswer: false
      }, {
        option: 'Angular 2 Services help to build the applications into many modules.',
        optionId: 1003,
        isAnswer: false
      }, {
        option: 'All of the above.',
        optionId: 1004,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following is true?',
    questionId: 1,
    options: [
      {
        option: 'Angular 2 Service can be used to bring the modules together.',
        optionId: 1101,
        isAnswer: false
      }, {
        option: 'Angular 2 Template can be used to bring the modules together.',
        optionId: 1102,
        isAnswer: false
      }, {
        option: 'Angular 2 Component can be used to bring the modules together.',
        optionId: 1103,
        isAnswer: true
      }, {
        option: 'All of the above.',
        optionId: 1104,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following is correct about Import Array in Angular 2 Modules?',
    questionId: 2,
    options: [
      {
        option: 'Import array can be used to import the functionality from other Angular JS modules.',
        optionId: 1201,
        isAnswer: true
      }, {
        option: 'Import array can be used to import the templates.',
        optionId: 1202,
        isAnswer: false
      }, {
        option: 'Both of the above.',
        optionId: 1203,
        isAnswer: false
      }, {
        option: 'None of the above.',
        optionId: 1204,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following is correct about Angular 2 Routing?',
    questionId: 3,
    options: [
      {
        option: 'Routing helps in directing users to different pages based on the option they choose on the main page.',
        optionId: 1301,
        isAnswer: false
      }, {
        option: 'Based on the option they choose, the required Angular Component will be rendered to the user.',
        optionId: 1302,
        isAnswer: false
      }, {
        option: 'Both of the above.',
        optionId: 1303,
        isAnswer: true
      }, {
        option: 'None of the above.',
        optionId: 1304,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following is correct about tsconfig.json?',
    questionId: 4,
    options: [
      {
        option: 'The target for the compilation is generally es5 because most browsers can only understand ES5 typescript.',
        optionId: 1401,
        isAnswer: false
      }, {
        option: 'The sourceMap option is used to generate Map files, which are useful when debugging.' +
        ' Hence, during development it is good to keep this option as true.',
        optionId: 1402,
        isAnswer: false
      }, {
        option: 'The "emitDecoratorMetadata": true and "experimentalDecorators": true is required for Angular JS decorators.' +
        ' If not in place, Angular JS application will not compile.',
        optionId: 1403,
        isAnswer: false
      }, {
        option: 'All of the above.',
        optionId: 1404,
        isAnswer: true
      },
    ]
  },
  {
    question: 'Which of the following filter is used to convert input to all lowercase?',
    questionId: 5,
    options: [
      {
        option: 'lowercase',
        optionId: 1501,
        isAnswer: true
      }, {
        option: 'lower',
        optionId: 1502,
        isAnswer: false
      }, {
        option: 'Both of the above.',
        optionId: 1503,
        isAnswer: false
      }, {
        option: 'None of the above.',
        optionId: 1504,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following filter is used to convert an input string to date format.',
    questionId: 6,
    options: [
      {
        option: 'dateformat',
        optionId: 1601,
        isAnswer: false
      }, {
        option: 'date',
        optionId: 1602,
        isAnswer: true
      }, {
        option: 'Both of the above.',
        optionId: 1603,
        isAnswer: false
      }, {
        option: 'None of the above.',
        optionId: 1604,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following is correct about lifecycle hook - ngOnInit.',
    questionId: 7,
    options: [
      {
        option: 'When the value of a data bound property changes, then this method is called.',
        optionId: 1701,
        isAnswer: false
      }, {
        option: 'This is called whenever the initialization of the directive/component' +
        ' after Angular first displays the data-bound properties happens.',
        optionId: 1702,
        isAnswer: true
      }, {
        option: 'This is for the detection and to act on changes that Angular can\'t or won\'t detect on its own.',
        optionId: 1703,
        isAnswer: false
      }, {
        option: 'This is called in response after Angular projects external content into the component\'s view.',
        optionId: 1704,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Which of the following is correct about lifecycle hook - ngAfterViewChecked.',
    questionId: 8,
    options: [
      {
        option: 'This is called in response after Angular checks the content projected into the component.',
        optionId: 1801,
        isAnswer: false
      }, {
        option: 'This is called in response after Angular initializes the component\'s views and child views.',
        optionId: 1802,
        isAnswer: false
      }, {
        option: 'This is called in response after Angular checks the component\'s views and child views.',
        optionId: 1803,
        isAnswer: true
      }, {
        option: 'This is the cleanup phase just before Angular destroys the directive/component.',
        optionId: 1804,
        isAnswer: false
      },
    ]
  },
  {
    question: 'Angular 2 is entirely component based. Controllers and $scope are no longer used.' +
    ' They have been replaced by . . . . . . . and . . . . . . . .',
    questionId: 9,
    options: [
      {
        option: 'components, controllers',
        optionId: 1901,
        isAnswer: false
      }, {
        option: '$scopes, components',
        optionId: 1902,
        isAnswer: false
      }, {
        option: 'components, directives',
        optionId: 1903,
        isAnswer: true
      }, {
        option: 'controllers, directives',
        optionId: 1904,
        isAnswer: false
      },
    ]
  }
];
