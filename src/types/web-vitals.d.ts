declare module 'web-vitals' {
  type Metric = {
    name: string;
    value: number;
    rating: string;
    delta: number;
    entries: PerformanceEntry[];
  };

  type ReportHandler = (metric: Metric) => void;

  export function getCLS(onReport: ReportHandler): void;
  export function getFID(onReport: ReportHandler): void;
  export function getFCP(onReport: ReportHandler): void;
  export function getLCP(onReport: ReportHandler): void;
  export function getTTFB(onReport: ReportHandler): void;
} 
