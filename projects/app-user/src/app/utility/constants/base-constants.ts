export enum QuestionType {
  TRUE_FALSE = 'true/false',
  MULTIPLE_CHOICE = 'multiple_choice',
  MULTIPLE_ANSWER_SELECTION = 'multiple_answer_selection',
  DESCRIPTIVE = 'descriptive',
  DROP_DOWN = 'drop_down',
  LINEAR_SCALE = 'linear_scale',
  DATE = 'date',
  TIME = 'time',
  MULTI_CHOICE_GRID = 'multi_choice_grid',
  CHECKBOX_GRID = 'checkbox_grid',
}

export const questionTypeArray = [
  {
    display: 'True or False', value: QuestionType.TRUE_FALSE
  },
  {
    display: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE
  },
  {
    display: 'Checkbox', value: QuestionType.MULTIPLE_ANSWER_SELECTION
  },
  {
    display: 'Descriptive', value: QuestionType.DESCRIPTIVE
  },
  {
    display: 'Drop down', value: QuestionType.DROP_DOWN
  },
  {
    display: 'Linear Scale', value: QuestionType.LINEAR_SCALE
  },
  {
    display: 'Date', value: QuestionType.DATE
  },
  {
    display: 'Time', value: QuestionType.TIME
  },
  {
    display: 'Multi Choice Grid', value: QuestionType.MULTI_CHOICE_GRID
  },
  {
    display: 'Checkbox Grid', value: QuestionType.CHECKBOX_GRID
  }
];
