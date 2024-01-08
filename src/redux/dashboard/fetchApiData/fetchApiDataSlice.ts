/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { url } from "@/routes";

const initialSelectedItem = localStorage.getItem("selectedItem");

type InitialStateType = {
  data: any | [];
  loading: boolean;
  selectedItem: any | null;
  searchedItem: any | [];
  address: any;
  authorized: boolean;
  passwordChangeRes: any;
  restpassword: any;
  updateDataResults: any;
  orderPending: any;
  TotalUser: any | [];
  RestroUser: any | [];
  clientDetails: any;
  selectedRows: string[];
  allItemsSelected: boolean;
  restaurantTables: [] | any;
  currentPage: number;
  limit: number;
  categorySearch: [] | any;
};

export const fetchDashboardData = createAsyncThunk(
  "fetchdashboardData/fetch",
  async ({ api, token }: { api: string; token?: string }) => {
    try {
      const res = await axios.get(`${url}/${api}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchClientDetails = createAsyncThunk(
  "client-info",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/client/info`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      err;
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const DashboardData = createAsyncThunk(
  "dashboardData/fetch",
  async ({ api, token }: { api: string; token?: string }) => {
    try {
      const res = await axios.get(`${url}/${api}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const RestroDashboardData = createAsyncThunk(
  "RestrodashboardData/fetch",
  async ({ api, token }: { api: string; token?: string }) => {
    try {
      const res = await axios.get(`${url}/${api}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchOrderPending = createAsyncThunk(
  "fetchOrderPending/fetch",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/order/pending-order`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data.totalResult;
    } catch (err) {
      err;
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const checkAuthorization = createAsyncThunk(
  "checkAuthorization/fetch",
  async ({ api, token }: { api: string; token: string }) => {
    try {
      const res = await axios.get(`${url}/${api}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data?.message);
      return res.data?.message;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchClientAddress = createAsyncThunk(
  "client-address/fetch",
  async ({ api, token }: { api: string; token?: string }) => {
    try {
      const res = await axios.get(`${url}/${api}`, {
        headers: {
          Authorization: token,
        },
      });
      res;
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      err;
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const deleteDashData = createAsyncThunk(
  "deleteData/delete",
  async ({
    api,
    token,
    ids,
  }: {
    api: string;
    token?: string;
    ids: string[];
  }) => {
    try {
      await axios.post(
        `${url}/${api}`,
        { ids: ids },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return ids;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const deleteDashDataWithDelete = createAsyncThunk(
  "deleteData/withDelete/method",
  async ({ api, token, body }: { api: string; token?: string; body: any }) => {
    console.log(body);
    try {
      await axios.delete(`${url}/${api}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: body,
      });
      console.log(body?.tableIds);
      return body?.tableIds;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const changeStatus = createAsyncThunk(
  "restaurant/changeStatus",
  async ({ id, token, api }: { id: string; token: string; api: string }) => {
    try {
      await axios.put(`${url}/${api}/${id}`, null, {
        headers: {
          Authorization: token!,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const performSearch = createAsyncThunk(
  "/search",
  async ({ data }: { data: string | undefined }) => {
    console.log("Here")
    try {
      console.log(data)
      const res = await axios.get(`${url}/search/${data}`);
      console.log("Here");
      console.log(res);
      return res.data.matched;
    } catch (err) {

      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const performCategorySearch = createAsyncThunk(
  "/category/search",
  async ({ data }: { data: string | undefined }) => {
    console.log(data);
    try {
      const res = await axios.get(`${url}/search/${data}`);
      console.log(res);
      return res.data.matched;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const UpdateData = createAsyncThunk(
  "updateData/update",
  async ({ api, token, form }: { api: string; token?: string; form: any }) => {
    try {
      const res = await axios.post(`${url}/${api}`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(res);
      return res.data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
  }
);

export const UpdateDataWithUpdate = createAsyncThunk(
  "updateData/update/method",
  async ({ api, token, form }: { api: string; token?: string; form: any }) => {
    try {
      const res = await axios.put(`${url}/${api}`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword/client",
  async ({ token, data }: { token?: string | null; data: any }) => {
    try {
      const res = await axios.post(`${url}/client/change-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const changeRestPassword = createAsyncThunk(
  "",
  async ({ token, data }: { token?: string | null; data: any }) => {
    try {
      const res = await axios.post(
        `${url}/restaurant/change-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchRestaurantTables = createAsyncThunk(
  "/restaurant/:restaurantId",
  async ({ restaurantId }: { restaurantId: string }) => {
    try {
      const res = await axios.get(
        `${url}/table/restaurant?restaurantId=${restaurantId}`
      );
      return res.data.table.table;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

const initialState: InitialStateType = {
  data: null,
  loading: false,
  selectedItem: initialSelectedItem ? JSON.parse(initialSelectedItem) : null,
  searchedItem: [],
  address: [],
  authorized: false,
  passwordChangeRes: "",
  updateDataResults: "",
  orderPending: "",
  TotalUser: null,
  RestroUser: null,
  clientDetails: null,
  selectedRows: [],
  allItemsSelected: false,
  restaurantTables: [],
  currentPage: 1,
  limit: 10,
  categorySearch: [],
  restpassword: "",
};

const fetchApiDataSlice = createSlice({
  name: "fetchDashboardData",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
      localStorage.setItem("selectedItem", JSON.stringify(state.selectedItem));
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      localStorage.setItem("selectedItem", "");
    },
    clearAllData: (state) => {
      state.data = null;
    },
    handleRowSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedRows.includes(id)) {
        state.selectedRows = state.selectedRows.filter((rowId) => rowId !== id);
      } else {
        state.selectedRows = [...state.selectedRows, id];
      }
    },
    handleSelectAllRows: (state, action) => {
      console.log(action.payload);
      const [firstElement] = action.payload;
      console.log(state.restaurantTables);

      const isRider = firstElement?.rider ? true : false;
      const isTable = firstElement?.tableNo ? true : false;

      state.allItemsSelected = !state.allItemsSelected;

      if (isRider && state.allItemsSelected) {
        state.selectedRows = state.data.map((item: any) => item?.rider?._id);
      } else if (isTable && state.allItemsSelected) {
        state.selectedRows = state.restaurantTables?.table?.map(
          (item: any) => item?._id
        );
      } else if (state.allItemsSelected) {
        state.selectedRows = state.data.map((item: any) => item._id);
      } else {
        state.selectedRows = [];
      }
    },
    clearSelectedRows: (state) => {
      state.selectedRows = [];
      state.allItemsSelected = false;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = null;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(DashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.TotalUser = action.payload;
      })
      .addCase(DashboardData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchClientDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.clientDetails = action.payload;
      })
      .addCase(fetchClientDetails.rejected, (state) => {
        state.loading = false;
      })

      .addCase(RestroDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(RestroDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.RestroUser = action.payload;
      })
      .addCase(RestroDashboardData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(performCategorySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(performCategorySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.categorySearch = action.payload;
      })
      .addCase(performCategorySearch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedItem = action.payload;
      })
      .addCase(performSearch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDashData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDashData.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItemIds = action.payload;
        state.data = state.data?.filter(
          (item: any) => !deletedItemIds.includes(item._id)
        );
      })
      .addCase(deleteDashData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateData.fulfilled, (state, action) => {
        state.loading = false;
        state.updateDataResults = action.payload;
      })
      .addCase(UpdateData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderPending.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderPending.fulfilled, (state, action) => {
        state.loading = false;
        state.orderPending = action.payload;
      })
      .addCase(fetchOrderPending.rejected, (state) => {
        state.loading = false;
      })
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordChangeRes = action.payload;
      })
      .addCase(changePassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchClientAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchClientAddress.rejected, (state) => {
        state.loading = false;
      })
      .addCase(changeRestPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeRestPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.restpassword = action.payload;
      })
      .addCase(changeRestPassword.rejected, (state) => {
        state.loading = false;
      })

      .addCase(checkAuthorization.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if (action.payload === "allow") {
          state.authorized = true;
          localStorage.setItem("authorized", String(state.authorized));
        }
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.loading = false;
        state.authorized = false;
        localStorage.setItem("authorized", String(state.authorized));
      })
      .addCase(deleteDashDataWithDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDashDataWithDelete.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItemIds = action.payload;
        state.restaurantTables = state.restaurantTables?.filter(
          (item: any) => !deletedItemIds.includes(item._id)
        );
      })
      .addCase(deleteDashDataWithDelete.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchRestaurantTables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantTables.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.restaurantTables = action.payload;
      })
      .addCase(fetchRestaurantTables.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedItem,
  clearSelectedItem,
  clearAllData,
  handleRowSelection,
  clearSelectedRows,
  handleSelectAllRows,
  setCurrentPage,
} = fetchApiDataSlice.actions;
export default fetchApiDataSlice.reducer;
