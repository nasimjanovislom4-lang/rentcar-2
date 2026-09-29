import { describe, it, expect } from "vitest";
import { calculateBookingPrice } from "../lib/pricing";

describe("Pricing and Booking calculations", () => {
  it("calculates basic rental price without extra services", () => {
    const result = calculateBookingPrice({
      dailyRate: 500000,
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-10-04"),
      depositAmount: 1000000,
      extraServices: [],
    });

    expect(result.totalDays).toBe(3);
    expect(result.rentalPrice).toBe(1500000);
    expect(result.extrasPrice).toBe(0);
    expect(result.totalPrice).toBe(1500000);
    expect(result.grandTotalWithDeposit).toBe(2500000);
  });

  it("calculates price with extra services (baby seat, insurance, personal driver)", () => {
    const result = calculateBookingPrice({
      dailyRate: 800000,
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-10-03"),
      depositAmount: 1500000,
      extraServices: ["KASKO sug'urta", "Bolalar o'rindig'i"],
    });

    expect(result.totalDays).toBe(2);
    expect(result.rentalPrice).toBe(1600000);
    // KASKO is 100,000/day * 2 = 200,000; Baby seat is 50,000 fixed
    expect(result.extrasPrice).toBe(250000);
    expect(result.totalPrice).toBe(1850000);
    expect(result.grandTotalWithDeposit).toBe(3350000);
  });

  it("applies long term discount for rentals >= 7 days", () => {
    const result = calculateBookingPrice({
      dailyRate: 1000000,
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-10-11"),
      depositAmount: 2000000,
      extraServices: [],
    });

    expect(result.totalDays).toBe(10);
    // 10% discount on 10,000,000 = 9,000,000
    expect(result.discountPercentage).toBe(10);
    expect(result.rentalPrice).toBe(9000000);
    expect(result.totalPrice).toBe(9000000);
  });
});
