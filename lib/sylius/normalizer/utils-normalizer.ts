import { Money } from '../types';

export const normalizePrice = (amount: number): Money => ({
  amount: (amount / 100).toString(),
  currencyCode: 'EUR'
});
