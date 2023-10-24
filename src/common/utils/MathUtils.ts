//path src/common/utils/MathUtils.ts

export const calculatePercentage = (amount: number, total: number) => {
  return ((amount / total) * 100).toFixed(2)
}
