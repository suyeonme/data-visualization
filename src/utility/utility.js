import { format } from 'd3';

export const formatNumber = format(',');
export const formatPercentage = n => n.toFixed(2) + '%';

export const formatString = str => {
  const lowerStr = str.toLowerCase();
  return lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1);
};

export const width = 1000;
export const height = 500;
