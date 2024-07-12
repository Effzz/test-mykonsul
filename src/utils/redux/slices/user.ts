import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        destroyData(state) {
            state.data = null;
        }
    }
});

export const { setData, destroyData } = userSlice.actions;
export default userSlice.reducer;
