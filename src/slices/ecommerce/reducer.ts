import { createSlice } from "@reduxjs/toolkit";
import { getCustomers, addNewCustomer, updateCustomer, deleteCustomer } from './thunk';
export const initialState: any = {
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

const EcommerceSlice = createSlice({
  name: 'EcommerceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomers.fulfilled, (state: any, action: any) => {
      state.customers = action.payload;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
    });

    builder.addCase(getCustomers.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = false;
    });

    builder.addCase(addNewCustomer.fulfilled, (state: any, action: any) => {
      state.customers.unshift(action.payload);
      state.isCustomerCreated = true;
    });
    builder.addCase(addNewCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateCustomer.fulfilled, (state: any, action: any) => {
      state.customers = state.customers.map((customer: any) =>
        customer.id === action.payload.id
          ? { ...customer, ...action.payload }
          : customer
      );
    });
    builder.addCase(updateCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteCustomer.fulfilled, (state: any, action: any) => {
      state.customers = state.customers.filter(
        (customer: any) => customer.id.toString() !== action.payload.customer.toString()
      );
    });
    builder.addCase(deleteCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default EcommerceSlice.reducer;