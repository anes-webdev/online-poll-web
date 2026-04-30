// Todo: check the name of this method:
// Todo: refactor this group method (make it shorter)
export const groupArray = <T>(array: T[], groupLength: number) => {
  let count = 1;
  const mainGroup: T[][] = [];
  let tempGroup: T[] = [];
  array.forEach((item, i) => {
    const isLastLoop = i + 1 === array.length;
    tempGroup.push(item);

    if (count < groupLength) {
      count++;
      if (isLastLoop) mainGroup.push(tempGroup);
    } else {
      mainGroup.push(tempGroup);
      tempGroup = [];
      count = 1;
    }
  });
  return mainGroup;
};
