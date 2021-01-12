import { format } from 'd3';

export const numberFormat = format(',');

export const stringFormat = str => {
  const lowerStr = str.toLowerCase();
  return lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1);
};

export const width = 1000;
export const height = 500;
