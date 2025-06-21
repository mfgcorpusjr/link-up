import { format } from "date-fns";

export const humanReadableDate = (date: Date) => format(date, "MMMM d, yyyy");
