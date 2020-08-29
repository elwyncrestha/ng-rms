import { DateRange } from '../models/date-range.enum';

export class DateUtils {
  static getDateRange(
    type: DateRange,
    seed?: Date
  ): { start: Date; end: Date } {
    const start = seed || new Date();
    const end = seed || new Date();
    switch (type) {
      case DateRange.TODAY:
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case DateRange.WEEK:
        start.setDate(start.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case DateRange.MONTH:
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setMonth(end.getMonth() + 1);
        end.setDate(1);
        end.setHours(0, 0, 0, 0);
        end.setSeconds(end.getSeconds() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case DateRange.YEAR:
        start.setMonth(0);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        break;
    }
    return { start, end };
  }
}
