import { format } from "date-fns";

export const getStringInputValueFromDate = (date: Date | null | undefined) => (date && format(new Date(date), 'yyyy-MM-dd')) ?? ''

export const getStringTimeInputValueFromDate = (date: Date | null | undefined) => (date && format(new Date(date), 'HH:mm')) ?? ''