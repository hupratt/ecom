const getPosition = (string, subString, index) =>
  string.split(subString, index).join(subString).length;

export const shortDescr = description => {
  if (description && description.length > 0) {
    var shortVersion = description;
    var i = 1;
    if (description.indexOf(".") < 60) {
      while (getPosition(shortVersion, ".", i) < 60) {
        shortVersion = description.slice(0, getPosition(description, ".", i));
        i++;

        if (i > 5) {
          break;
        }
      }
      return shortVersion;
    } else {
      return description.slice(0, 60) + " (...)";
    }
  }
};
