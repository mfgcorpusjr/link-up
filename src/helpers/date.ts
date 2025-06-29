import { format } from "date-fns";

export const humanReadableDate = (date: Date) => format(date, "MMMM d, yyyy");

export const shortHandDate = (date: Date) => format(date, "MMM d");
