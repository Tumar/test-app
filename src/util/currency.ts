const CENTS_IN_UNIT = 100;

export const currencyUnitsToCents = (amountInUnits: number) => Math.ceil(amountInUnits * CENTS_IN_UNIT);

export const currencyCentsToUnits = (amountInCents: number) => amountInCents / CENTS_IN_UNIT;
