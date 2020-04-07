import moment from "moment";

export function getDate(): string {
  return moment().format("DD/MM/YYYY HH-mm-ss");
}
