const logger = {
  format(type, text) {
    const date = new Date().toLocaleString();
    return `${date} - ${type} - ${text}`;
  },
  info(text) {
    console.log(this.format('Info', text));
  },
  error(text) {
    console.log(text.trace);
    console.error(this.format('Error', text));
  },
  exception(exception) {
    let stack;
    if (exception.stack) {
      stack = exception.stack;
    } else {
      stack = `${exception}\n${new Error().stack}`;
    }
    console.error(this.format('Error', `${stack}`));
  },
  debug(text) {
    console.debug(this.format('Debug', text));
  },
};

module.exports = logger;

