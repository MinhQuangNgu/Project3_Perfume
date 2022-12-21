import {createSlice} from '@reduxjs/toolkit';

const auth = createSlice({
    name:"auth",
    initialState:{
        user:null,
        fail:false,
        loading:false
    },
    reducers:{
        isLogin:(state,action) => {
            state.fail = false;
            state.loading = false;
            state.user = action.payload;
        },
        isLoading:(state) => {
            state.fail = false;
            state.loading = true;
        },
        isFailing:(state) =>{
            state.fail = true;
            state.loading = false;
        },
        isSuccess:(state) => {
            state.fail = false;
            state.loading = false;
        },
        isLogout:(state) => {
            state.fail = false;
            state.loading = false;
            state.user = null;
        }
    }
});

export const {isFailing,isLoading,isLogin,isLogout,isSuccess} = auth.actions;
export default auth.reducer;