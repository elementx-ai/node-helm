const constants = require("./constants");

function addParentOptionsForCommand(options, command) {
  for (const parentOptionName in constants.ParentOptionsDictionary) {
    if (options.hasOwnProperty(parentOptionName)) {
      const parentOption = constants.ParentOptionsDictionary[parentOptionName];
      command.push(parentOption.command);
      //Todo: verify typing
      if (parentOption.type) {
        command.push(options[parentOptionName]);
      }
    }
  }
}

module.exports = {
  addParentOptions : addParentOptionsForCommand,
};
