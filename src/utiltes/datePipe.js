export default function convertToLocalDate(date) {
  const dateFromDB = new Date(date);
  return ` ${dateFromDB.getDate()}/${
    dateFromDB.getMonth() + 1
  }/ ${dateFromDB.getFullYear()}`;
}
