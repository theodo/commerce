import { Money } from '../types';

export const normalizePrice = (amount: number): Money => ({
  amount: centsPriceToUnitsPrice(amount).toString(),
  currencyCode: 'EUR'
});

export const centsPriceToUnitsPrice = (amount: number): number => amount / 100;
