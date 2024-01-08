import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFoodDetailState } from "@/types";
import { url } from "@/routes";

const initialState: IFoodDetailState = {
  restaurantOrder: [],
  category: [],
  allFoodData: [],
  restaurantFood: [],
  dynamicFoodData: [],
  loading: false,
  foodNumberData: {
    increment: 0,
    currentYearData: 0,
  },
  orderPercentageData: {
    pickupPercentage: 0,
    homeDeliveryPercentage: 0,
  },
  indvCategory: {
    countryFood: "",
    images: [""],
    activeStatus: false,
    _id: " ",
    name: " ",
    extra: " ",
  },
  catImgDeletionRes: {},
  totalOrders: [],
};

export const fetchFoodCategory = createAsyncThunk(
  "foodCategory/fetch",
  async ({ token }: { token?: string }) => {
    try {
      const res = await axios.get(`${url}/food-category`, {
        headers: {
          Authorization: token,
        },
      });

      return res.data.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchRestaurantFood = createAsyncThunk(
  "restaurantFood/fetch",
  async ({ id }: { id: string }) => {

    try {
      const res = await axios.get(`${url}/food/restaurant-food/${id}`);
      console.log(res);
      return res.data?.Data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchAllFoodData = createAsyncThunk(
  "allFoodData/fetch",
  async () => {
    try {
      const res = await axios.get(`${url}/food`);
      return res.data?.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchFoodApiData = createAsyncThunk(
  "FoodApiData/fetch",
  async ({ api }: { api?: string }) => {
    try {
      const res = await axios.get(`${url}/${api}`);
      console.log(res);
      return res.data?.data || res.data?.Data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchFoodNumber = createAsyncThunk(
  "/food/count",
  async ({ token }: { token?: string }) => {
    try {
      const res = await axios.get(`${url}/order/count`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchOrderPercentData = createAsyncThunk(
  "/order/percent",
  async ({ token }: { token: string|null }) => {
    try {
      const res = await axios.get(`${url}/order/deliveryType/percentage`, {
        
        headers: {
          Authorization: token,
        },
      });
  console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchIndvCategory = createAsyncThunk(
  "food-category/id/:id",
  async ({ id, token }: { id: string | undefined; token?: string }) => {
    try {
      const res = await axios.get(`${url}/food-category/id/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

//category image manupulations
export const deleteCategoryImage = createAsyncThunk(
  "imageUpload/delete",
  async ({
    imageFileNames,
    token,
  }: {
    imageFileNames: Array<string>;
    token?: string;
  }) => {
    try {
      const res = await axios.delete(`${url}/imageUpload/delete`, {
        headers: {
          Authorization: token,
        },
        data: { imageFileNames },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const uploadCategoryImage = createAsyncThunk(
  "imageUpload/upload",
  async ({ imageName, token }: { imageName: FormData; token?: string }) => {
    console.log(imageName);
    try {
      const res = await axios.post(`${url}/imageUpload/upload`, {
        headers: {
          Authorization: token,
        },
        data: { files: imageName },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

const foodDetailSlice = createSlice({
  name: "foodDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoodCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchFoodCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchRestaurantFood.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantFood.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantFood = action.payload;
      })
      .addCase(fetchRestaurantFood.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllFoodData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllFoodData.fulfilled, (state, action) => {
        state.loading = false;
        state.allFoodData = action.payload;
      })
      .addCase(fetchAllFoodData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFoodApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoodApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.dynamicFoodData = action.payload;
      })
      .addCase(fetchFoodApiData.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchFoodNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoodNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.foodNumberData = action.payload;
      })
      .addCase(fetchFoodNumber.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchOrderPercentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderPercentData.fulfilled, (state, action) => {
        state.loading = false;
        state.orderPercentageData = action.payload;
      })
      .addCase(fetchOrderPercentData.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchIndvCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndvCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.indvCategory = action.payload;
      })
      .addCase(fetchIndvCategory.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteCategoryImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategoryImage.rejected, (state) => {
        state.loading = false;
      });
    //Total orders
  },
});

export default foodDetailSlice.reducer;
