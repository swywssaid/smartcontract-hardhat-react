interface OverviewDataType {
  continuousAttendanceDays: number;
  totalAttendanceDays: number;
  continuousStudytime: string;
  PaybackHistoryTableType: PaybackHistoryTableType;
}

interface PaybackHistoryTableType {
  [date: string]: {
    checkInState: string;
    checkInTime: string;
    checkOutTime: string;
    paybackPercentage: number;
  };
}

export type { OverviewDataType, PaybackHistoryTableType };
