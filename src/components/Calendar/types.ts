export type PossibleDate = Date | undefined;

export type PossibleDay = string | undefined;

export type Matrix = PossibleDay[][];

export type DisabledDays = (day: Date) => boolean;

export type DateRange = [PossibleDate, PossibleDate];
