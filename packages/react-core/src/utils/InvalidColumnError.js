const NAME = 'InvalidColumnError';
const MESSAGE_START = `Uncaught ${NAME}:`;

export class InvalidColumnError extends Error {
  constructor(message) {
    super(message);
    this.name = NAME;
  }

  static is(error) {
    return error.message?.startsWith(MESSAGE_START);
  }

  static getMessage(error) {
    return error.message.replace(MESSAGE_START, '');
  }
}
