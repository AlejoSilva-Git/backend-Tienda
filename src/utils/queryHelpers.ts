import { Request } from "express";

export const getQueryString = (value: string | string[] | undefined): string | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value[0];
  return value;
};

export const getQueryNumber = (value: string | string[] | undefined): number | undefined => {
  const str = getQueryString(value);
  if (!str) return undefined;
  const num = parseFloat(str);
  return isNaN(num) ? undefined : num;
};

export const getQueryInt = (value: string | string[] | undefined): number | undefined => {
  const num = getQueryNumber(value);
  return num !== undefined ? Math.floor(num) : undefined;
};