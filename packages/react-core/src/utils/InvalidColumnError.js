const NAME = 'InvalidColumnError';
const MESSAGE_START = `Uncaught ${NAME}:`;

export class InvalidColumnError extends Error {
  static message =
    'The column selected for this widget is no longer available in the data source.';

  constructor(message) {
    super(message);
    this.name = NAME;
  }

  static is(error) {
    return error.message?.startsWith(MESSAGE_START);
  }
}
