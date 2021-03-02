import moment from "moment";

const addPriorityValues = priority => {
  if (priority === "low") {
    return 1;
  }
  if (priority === "medium") {
    return 2;
  }
  if (priority === "high") {
    return 3;
  }
  if (priority === "highest") {
    return 4;
  }
};

export const sorter = (value, listToSort) => {
  if (value === "Priority") {
    const listSorted = listToSort.sort((a, b) => {
      return addPriorityValues(b.priority) - addPriorityValues(a.priority);
    });
    return listSorted;
  }
  if (value === "Due Date") {
    const listSorted = listToSort.sort((a, b) => {
      const dateA = moment(a.dueDate, "DD-MM-YYYY");
      const dateB = moment(b.dueDate, "DD-MM-YYYY");
      return new Date(dateA) - new Date(dateB);
    });
    return listSorted;
  }
};
