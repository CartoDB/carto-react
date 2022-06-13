const NAME = 'InvalidColumnError';
const ERR_START_MESSAGE = `${NAME}: `;

export class InvalidColumnError extends Error {
  constructor(message) {
    super(`${ERR_START_MESSAGE}${message}`);
    this.name = NAME;
  }

  static is(error) {
    return (
      error instanceof InvalidColumnError || error.message?.includes(ERR_START_MESSAGE)
    );
  }
}
