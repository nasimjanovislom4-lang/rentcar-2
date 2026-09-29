export interface CalculateBookingPriceParams {
  dailyRate: number;
  startDate: Date | string;
  endDate: Date | string;
  depositAmount: number;
  extraServices?: string[];
}

export interface PricingResult {
  totalDays: number;
  baseRentalPrice: number;
  discountPercentage: number;
  rentalPrice: number;
  extrasPrice: number;
  totalPrice: number;
  depositAmount: number;
  grandTotalWithDeposit: number;
}

export function calculateBookingPrice({
  dailyRate,
  startDate,
  endDate,
  depositAmount,
  extraServices = [],
}: CalculateBookingPriceParams): PricingResult {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();
  let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (totalDays < 1) totalDays = 1;

  const baseRentalPrice = totalDays * dailyRate;

  // Discount rules: >= 7 days = 10% discount, >= 14 days = 15% discount
  let discountPercentage = 0;
  if (totalDays >= 14) {
    discountPercentage = 15;
  } else if (totalDays >= 7) {
    discountPercentage = 10;
  }

  const discountAmount = (baseRentalPrice * discountPercentage) / 100;
  const rentalPrice = baseRentalPrice - discountAmount;

  // Extra services pricing
  let extrasPrice = 0;
  for (const service of extraServices) {
    if (service === "KASKO sug'urta") {
      extrasPrice += 100000 * totalDays;
    } else if (service === "Bolalar o'rindig'i") {
      extrasPrice += 50000; // Fixed one-time
    } else if (service === "Shaxsiy haydovchi") {
      extrasPrice += 200000 * totalDays;
    } else if (service === "GPS navigator") {
      extrasPrice += 30000;
    }
  }

  const totalPrice = rentalPrice + extrasPrice;
  const grandTotalWithDeposit = totalPrice + depositAmount;

  return {
    totalDays,
    baseRentalPrice,
    discountPercentage,
    rentalPrice,
    extrasPrice,
    totalPrice,
    depositAmount,
    grandTotalWithDeposit,
  };
}
