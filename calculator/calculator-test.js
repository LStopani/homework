
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment(120, 1, 0))
    .toEqual('$10.00');
  expect(calculateMonthlyPayment(12, 1, 1))
    .toEqual('$1.01');
  expect(calculateMonthlyPayment(12, 2, 1))
    .toEqual('$0.51');
});


it("should return a result with 2 decimal places", function () {
  expect(calculateMonthlyPayment(120.0011, 1.001, 1.001))
    .toEqual('$10.05');
});

