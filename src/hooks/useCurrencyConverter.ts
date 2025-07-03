const exchangeRates:Record<string,number> ={
  USD:1,
  INR:80,
  AED:3.67
}

const currencyConverter = (amount: number, from:string, to:string) => {
   const fromRate=exchangeRates[from];
   const toRate = exchangeRates[to];

   if(!fromRate || !toRate) {
      throw new Error(`invalid currency: ${from} or ${to}`);
   }

   const amountInUSD = amount / fromRate;
   const convertedAmountamount = amountInUSD * toRate;

   return parseFloat(convertedAmountamount.toFixed(2));
   
};

export default currencyConverter;