import { configureStore } from "@reduxjs/toolkit";
import { ClientApi } from "../api/clientApi";
import { BillApi } from "../api/billApi";
import { PaymentApi } from "../api/paymentApi";
import { currencyApi } from "../api/currencyApi";

export const store = configureStore({
    reducer: {
        [ClientApi.reducerPath]: ClientApi.reducer,
        [BillApi.reducerPath]: BillApi.reducer,
        [PaymentApi.reducerPath]: PaymentApi.reducer,
        [currencyApi.reducerPath]: currencyApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ClientApi.middleware, BillApi.middleware, PaymentApi.middleware, currencyApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;