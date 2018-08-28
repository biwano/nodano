const init = function init(globalLevelText) {
  const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'EXCEPTION'];
  const getLevel = function getLevel(levelText) {
    return levels.indexOf(levelText);
  };
  const globalLevel = getLevel(globalLevelText);
  const checkLevel = function checkLevel(localLevelText) {
    const localLevel = getLevel(localLevelText);
    return localLevel >= globalLevel;
  };
  return {
    format(type, text) {
      const date = new Date().toLocaleString();
      return `${date} - ${type} - ${text}`;
    },
    info(text) {
      if (checkLevel('INFO')) {
        console.log(this.format('Info', text));
      }
    },
    warn(text) {
      if (checkLevel('WARN')) {
        console.log(this.format('Info', text));
      }
    },
    error(text) {
      if (checkLevel('ERROR')) {
        console.log(text.trace);
        console.error(this.format('Error', text));
      }
    },
    exception(exception) {
      if (checkLevel('EXCEPTION')) {
        let stack;
        if (exception.stack) {
          stack = exception.stack;
        } else {
          stack = `${exception}\n${new Error().stack}`;
        }
        console.error(this.format('Error', `${stack}`));
      }
    },
    debug(text) {
      if (checkLevel('DEBUG')) {
        console.debug(this.format('Debug', text));
      }
    },
  };
};
function destroy() {}
module.exports = { priority: 100, init };

