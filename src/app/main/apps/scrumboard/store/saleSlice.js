import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSales = createAsyncThunk('salesApp/sale/getSales', async () => {
	const response = await axios.get('/api/sales-app/get');
	const data = await response.data;
	return data;
});

const salesAdapter = createEntityAdapter({});

export const {
	selectAll: selectSales
} = salesAdapter.getSelectors(state => state.scrumboardApp.sales);


const saleSlice = createSlice({
	name: 'salesApp/sale', 
	initialState: salesAdapter.getInitialState({}),

	extraReducers: {
		[getSales.fulfilled]: salesAdapter.setAll,
	}
});

export default saleSlice.reducer;