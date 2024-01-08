/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from '@/routes';
import { Role } from '@/routes/PrivateRoute';

type DeocdeToken = {
    role: Role;
    id: string;
}

type User = {
    [key: string]: string;
}
const storedToken = localStorage.getItem('token');
const storedRole = localStorage.getItem('role');
const storeClientToken = localStorage.getItem('clientToken')

const initialState: {
    message: string | null;
    loading: boolean;
    token: string | null;
    role: Role,
    id: string | null;
    userToken: string | null;
} = {
    message: "",
    loading: false,
    token: storedToken || null,
    role: storedRole as Role || "",
    id: "",
    userToken: storeClientToken || null,
};

export const signinUser = createAsyncThunk('signin', async (formData?: User) => {
    try {
        const res = await axios.post(`${url}/client/login`, formData);
        const { message, token } = res.data;
        return { message, token };
    } catch (err: any) {
        throw err.response.data.message
    }
});

export const signinAdmin = createAsyncThunk('signin/admin', async (formData: User) => {
    try {
        const res = await axios.post(`${url}/admin/login`, formData);
        const { token } = res.data || "";
        return { token };
    } catch (err: any) {
        console.log(err)
        throw err.response.data.message
    }
});

export const signInWithGoogle = createAsyncThunk('sigin/login', async ({ api, tokenId }: { api: string, tokenId: string }) => {
    try {
        const res = await axios.post(`${url}/${api}`, { tokenId: tokenId })
        const { message, token } = res.data
        return { message, token }
    } catch (err: any) {
        throw err.response.data.token
    }
})

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        logout(state) {
            state.token = '';
            state.role = '';
            state.userToken = "";
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('selectedItem');
            localStorage.removeItem("desc")
            localStorage.removeItem("resAdminId")
        },
        clientLogout(state) {
            state.userToken = '';
            localStorage.removeItem("clientToken")
            localStorage.removeItem("cartDatas")
            localStorage.removeItem("restaurantId")
            localStorage.removeItem("favRestros")
            localStorage.removeItem("longitude")
            localStorage.removeItem("latitude")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.userToken = action.payload.token
                if (state.userToken)
                    localStorage.setItem('clientToken', state.userToken);
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "An error occurred during signin";
            }).addCase(signinAdmin.pending, (state) => {
                state.loading = true;
            }).addCase(signinAdmin.fulfilled, (state, action) => {
                state.loading = false;
                const decodeToken: DeocdeToken = jwtDecode(action.payload.token);
                state.role = decodeToken.role;
                state.token = action.payload.token;
                state.id = decodeToken.id;
                if (state.role && state.token)
                    localStorage.setItem("token", state.token);
                localStorage.setItem("role", state.role);

            }).addCase(signinAdmin.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "An error occurred during login"
            }).addCase(signInWithGoogle.pending, (state) => {
                state.loading = true;
            }).addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload?.message
                state.userToken = action.payload?.token
                if (state.userToken) {
                    localStorage.setItem('clientToken', state.userToken);
                }
            }).addCase(signInWithGoogle.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message)
                    localStorage.setItem('clientToken', action.error.message)
                state.userToken = action.error.message!

            })
    },
});

export default signinSlice.reducer
export const { logout, clientLogout } = signinSlice.actions
