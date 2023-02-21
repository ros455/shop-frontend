import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNowa = createAsyncThunk('nowa/fetchNowa', async(city) => {

            const obj = {
                "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
                "modelName": "Address",
                "calledMethod": "searchSettlements",
                "methodProperties": {
                    "CityName": `${city}`,
                    "Limit": "550",
                    "Page": "1"
                }
            }

            const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
              method: 'POST',
              body: JSON.stringify(obj) 
            });

            const {data} = await response.json(); 
            return data

})

export const fetchNowaCity = createAsyncThunk('city/fetchNowaCity', async(ref) => {
    const obj1 = {
        "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityRef": `${ref}`
        }
    }

    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      body: JSON.stringify(obj1) 
    });

    const {data} = await response.json(); 
    return data

})
 
const nowaSlice = createSlice({
    name: 'nowa',
    initialState: {
        nowa: {
            items: [],
            status: 'loading',
        },
        city: [],
        endCity: [],
    },

    extraReducers: {
        [fetchNowa.pending]: (state) => {
            state.nowa.items = [];
            state.nowa.status = 'loading';
        },
        [fetchNowa.fulfilled]: (state,action) => {
            state.nowa.items = action.payload;
            state.nowa.status = 'loaded';
        },
        [fetchNowa.rejected]: (state) => {
            state.nowa.items = [];
            state.nowa.status = 'error';
        },
        [fetchNowaCity.pending]: (state) => {
            state.city = [];
            state.nowa.status = 'loading';
        },
        [fetchNowaCity.fulfilled]: (state,action) => {
            state.city = action.payload;
            state.nowa.status = 'loaded';
        },
        [fetchNowaCity.rejected]: (state) => {
            state.city = [];
            state.nowa.status = 'error';
        },
    }
})

export const getNowa = state => state.nowa.nowa.items;

export const getNowaCity = state => state.nowa.city;

export const getNowaEndCity = state => state.nowa.city[0];

export const nowaReducer = nowaSlice.reducer;
