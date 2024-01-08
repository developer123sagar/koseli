/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "@/routes";
import { IrestaurantSlice } from "@/types";
import { useAppSelector } from "../store";
import { RootState } from "../store";

const restaurantId = localStorage.getItem("restaurantId");

const initialState: IrestaurantSlice = {
  restaurantData: [],
  loading: false,
  restaurantId: restaurantId || "",
  nearbyData: [],
  popularData: [],
  restaurantNumberData: {
    increment: 0,
    currentYearData: 0,
  },
  chartData: {
    series: [
      {
        name: "",
        data: [0],
      },
    ],
  },
  indvRestaurant: {
    mainImage: " ",
    address: " ",
    zipCode: " ",
    name: " ",
    vegetarian: false,
  },
  restaurantSlots: [],
  restaurantTables: [],
  tableBooked: [],
  restaurantWalletData: [],
  restaurantOrder: [],
  restInfo: {},
  chatClient: {},
  totalOrders: {},
  reviews: "",
  averagerating: {},
  bookingreview: [],
  restAdminId: "",
  comboOffers: [],
  sponsoredRestro: [],
  dietaryRestro: [],
  inddietaryRestro: [],
  indvComboOffer: [],
  indvSpecialOffer: [],
  noticeBanners: [],
  restadminInfo: {},
  restaurantChart: [],
  story:[]
};

export const fetchRestaurant = createAsyncThunk(
  "restaurant/fetch",
  async () => {
    try {
      const res = await axios.get(`${url}/restaurant`);
      console.log(res);
      return res.data?.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchSponsoredRestro = createAsyncThunk(
  "sponsored/restro",
  async ({
    latitude,
    longitude,
  }: {
    latitude: string | null;
    longitude: string | null;
  }) => {
    try {
      const res = await axios.get(
        `${url}/advertisement/display-adds?userLocation[coordinates][]=${latitude}&userLocation[coordinates][]=${longitude}`
      );
      if (res.data.restaurants) return res.data.restaurants;
      else return [];
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const fetchDietarydRestro = createAsyncThunk(
  "dietary/restro",
  async ({
    latitude,
    longitude,
  }: {
    latitude: string | null;
    longitude: string | null;
  }) => {
    try {
      const res = await axios.get(
        `${url}/dietary-plan?userLocation[coordinates][]=${latitude}&userLocation[coordinates][]=${longitude}`
      );
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const fetchIndvDietary = createAsyncThunk(
  "inddietary/restro",
  async ({
    latitude,
    longitude,
    restaurantId,
  }: {
    latitude: string | null;
    longitude: string | null;
    restaurantId: string;
  }) => {
    try {
      const res = await axios.get(`${url}/dietary-plan/restaurant-dietplan`, {
        params: {
          restaurantId,
          "userLocation[coordinates][]": [latitude, longitude],
        },
      });
      return res.data?.Data || res.data?.data || res.data?.found || res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchIndvRestInfo = createAsyncThunk(
  "indv-restaurant/info/fetch",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/restaurant-info`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data.Data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchRestAdminId = createAsyncThunk(
  "restaurant/admin_id",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/restaurantAdmin-info`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      return res.data.Data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const fetchRestroInfo = createAsyncThunk(
  "restaurant/admininfo",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/info`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      return res.data.Data || res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchNoticeBanners = createAsyncThunk(
  "notice/banners",
  async () => {
    try {
      const res = await axios.get(`${url}/notice`);
      return res.data.Data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchChatEntities = createAsyncThunk(
  "chatEntities/details",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/restaurant-info?`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data.Data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchStories = createAsyncThunk(
  "restaurant/story",
  async () => {
    try {
      const res = await axios.get(`${url}/story`);
      console.log(res.data.Data);
      return res.data.Data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchRestaurantOrders = createAsyncThunk(
  "/order/restaurantOrder/count",
  async (token: string | null) => {
    console.log("here");
    try {
      const res = await axios.get(`${url}/order/restaurantOrder/count`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occured" + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const Restaurant_Wallet = createAsyncThunk(
  "/restaurant/wallet",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/wallet/user`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const Average_Rating = createAsyncThunk(
  "/Average/review",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/review/restaurant/${restaurantId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(token);
      console.log(res);
      return res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const BookDetail_Review = createAsyncThunk(
  "/bookdetail/review",
  async ({ restaurantId }: { restaurantId: string }) => {
    try {
      const res = await axios.get(
        `${url}/booking/Review/restaurant?restaurantId=${restaurantId}`
      );
      console.log(res);
      return res.data.Data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const Restaurant_Review = createAsyncThunk(
  "/restaurant/review",
  async ({
    token,
    restaurantId,
  }: {
    restaurantId: string;
    token: string | null;
  }) => {
    try {
      const res = await axios.get(
        `${url}/food-preparationratings/average-ratings/restaurant?restaurantId=${restaurantId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      return res.data.averageRating;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const Food_Review = createAsyncThunk("/Food/review", async () => {
  useAppSelector((state: RootState) => state.signin.token);
  try {
    const res = await axios.get(`${url}/review/restaurant-review `);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    const customError = new Error(
      "An error occurred: " + (err as Error).message
    ) as Error;
    throw customError;
  }
});

export const fetchRestaurantOrder = createAsyncThunk(
  "order/restaurantOrder/count",
  async () => {
    const token = useAppSelector((state: RootState) => state.signin.token);

    try {
      const res = await axios.get(`${url}/order/restaurantOrder/count`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchRestaurantNumber = createAsyncThunk(
  "/restaurant/count",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/count`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data; //increment,currentYearData
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchNearbyRestaurant = createAsyncThunk(
  "/near-me/latitude/longitude",
  async ({ lat, long }: { lat: string | null; long: string | null }) => {
    console.log(lat);
    console.log(long);
    try {
      const res = await axios.get(`${url}/restaurant/near-me/${long}/${lat}`);
      console.log(res);
      return res.data.data;
    } catch (err: any) {
      console.log(err.response.data);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchPopularRestaurant = createAsyncThunk(
  "/near-me/popular/restaurant",
  async ({ lat, long }: { lat: string | null; long: string | null }) => {
    try {
      const res = await axios.get(
        `${url}/restaurant/near-me/popular/${long}/${lat}`
      );
      return res.data.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchChartRestaurant = createAsyncThunk(
  "restaurant/per-month",
  async (token: string | null) => {
    try {
      const res = await axios.get(`${url}/restaurant/per-month`, {
        headers: {
          Authorization: token,
        },
      });
      const monthyCountRestaurant = res.data.monthlyCountsRestaurant;
      const monthyCountOrder = res.data.monthlyCountsOrder;

      const format = {
        series: [
          {
            name: "Restaurants",
            data: monthyCountRestaurant,
          },
          {
            name: "Orders",
            data: monthyCountOrder,
          },
        ],
      };
      return format;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchRestaurantSlots = createAsyncThunk(
  "/restaurant/slots",
  async (id: string) => {
    try {
      const res = await axios.get(
        `${url}/bookingtable/timeSlot?restaurantId=${id}`
      );
      return res.data.timeSlot;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchRestaurantTables = createAsyncThunk(
  "/restaurant/:restaurantId",
  async ({ restaurantId }: { restaurantId: string }) => {
    console.log("Restaurant table fetched");
    try {
      const res = await axios.get(
        `${url}/table/restaurant?restaurantId=${restaurantId}`
      );
      console.log(res);
      return res.data.table;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const fetchTableBooked = createAsyncThunk(
  "/bookingTable/booked",
  async ({
    restaurantId,
    date,
    tableId,
    tkn,
  }: {
    restaurantId: string;
    date: string;
    tableId: string;
    tkn: string | null;
  }) => {
    console.log(tkn);
    try {
      const res = await axios.get(
        `${url}/bookingTable/booked?restaurantId=${restaurantId}&Date=${date}&tableId=${tableId}`,
        {
          headers: {
            Authorization: tkn,
          },
        }
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

export const fetchChatClient = createAsyncThunk(
  "/chatClient/id",
  async ({ clientId, token }: { clientId: string; token: string | null }) => {
    try {
      const res = await axios.get(`${url}/client/client-info?Id=${clientId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchComboOffer = createAsyncThunk(
  "/comboOffer/restaurants",
  async ({
    latitude,
    longitude,
  }: {
    latitude: string | null;
    longitude: string | null;
  }) => {
    try {
      const res = await axios.get(
        `${url}/combo-offers/nearBy-comboOffer/${longitude}/${latitude}`
      );
      console.log(res);
      return res.data.Data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchIndvComboOffer = createAsyncThunk(
  "/comboOffer/indv_restaurant",
  async (restaurantId: string) => {
    console.log(restaurantId);
    try {
      const res = await axios.get(
        `${url}/combo-offers/restaurant-comboOffer?restaurantId=${restaurantId}`
      );
      console.log(res);
      return res.data.Data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const fetchIndvSpecialOffer = createAsyncThunk(
  "/specialOffer/indv_restaurant",
  async ({ restaurantId }: { restaurantId: string }) => {
    console.log(restaurantId);
    try {
      const res = await axios.get(
        `${url}/food-speciality/restaurant/${restaurantId}`
      );
      console.log(res);
      return res.data.Data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
export const fetchRestaurantChart = createAsyncThunk(
  "/restaurant/chart",
  async (token:string|null) => {
    try {
      const res = await axios.get(
        `${url}/restaurant/per-month/restaurant`,{
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data.monthlyCountsOrder;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);
const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    saveRestroId(state, action) {
      state.restaurantId = action.payload;
      localStorage.setItem("restaurantId", state.restaurantId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantData = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state) => {
        state.loading = false;
      })

      // Group the related actions together with a common logic
      .addCase(fetchNearbyRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNearbyRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyData = action.payload;
      })
      .addCase(fetchNearbyRestaurant.rejected, (state) => {
        state.loading = false;
      })

      // Continue this pattern for other actions
      .addCase(fetchPopularRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.popularData = action.payload;
      })
      .addCase(fetchPopularRestaurant.rejected, (state) => {
        state.loading = false;
      })

      // Continue this pattern for other actions
      .addCase(fetchTableBooked.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableBooked.fulfilled, (state, action) => {
        state.loading = false;
        state.tableBooked = action.payload;
      })
      .addCase(fetchTableBooked.rejected, (state) => {
        state.loading = false;
      })

      // Continue this pattern for other actions
      .addCase(fetchRestaurantNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantNumberData = action.payload;
      })
      .addCase(fetchRestaurantNumber.rejected, (state) => {
        state.loading = false;
      })

      // Continue this pattern for other actions
      .addCase(fetchRestaurantSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantSlots = action.payload;
      })
      .addCase(fetchRestaurantSlots.rejected, (state) => {
        state.loading = false;
      })
      // Continue this pattern for other actions
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
      })

      // Add other related actions here as neede
      .addCase(fetchChartRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(fetchChartRestaurant.rejected, (state) => {
        state.loading = false;
      })
      //total order

      .addCase(fetchRestaurantOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrders = action.payload;
      })
      .addCase(fetchRestaurantOrders.rejected, (state) => {
        state.loading = false;
      })

      //indv combo offer

      .addCase(fetchIndvComboOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndvComboOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.indvComboOffer = action.payload;
      })
      .addCase(fetchIndvComboOffer.rejected, (state) => {
        state.loading = false;
      })
      //ind special offer
      .addCase(fetchIndvSpecialOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndvSpecialOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.indvSpecialOffer = action.payload;
      })
      .addCase(fetchIndvSpecialOffer.rejected, (state) => {
        state.loading = false;
      })

      // Add other related actions here as neede
      .addCase(Restaurant_Wallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(Restaurant_Wallet.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantWalletData = action.payload;
      })
      .addCase(Restaurant_Wallet.rejected, (state) => {
        state.loading = false;
      })

      .addCase(Food_Review.pending, (state) => {
        state.loading = true;
      })
      .addCase(Food_Review.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(Food_Review.rejected, (state) => {
        state.loading = false;
      })

      // Add other related actions here for order
      .addCase(fetchRestaurantOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantOrder = action.payload;
      })
      .addCase(fetchRestaurantOrder.rejected, (state) => {
        state.loading = false;
      })

      // Add other related actions here for order
      .addCase(fetchChatClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatClient.fulfilled, (state, action) => {
        state.loading = false;
        state.chatClient = action.payload;
      })
      .addCase(fetchChatClient.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchIndvRestInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndvRestInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.restInfo = action.payload;
      })
      .addCase(fetchIndvRestInfo.rejected, (state) => {
        state.loading = false;
      })

      //restaurant admin
      .addCase(fetchRestAdminId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestAdminId.fulfilled, (state, action) => {
        state.loading = false;
        state.restAdminId = action.payload;
      })
      .addCase(fetchRestAdminId.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchRestroInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestroInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.restadminInfo = action.payload;
      })
      .addCase(fetchRestroInfo.rejected, (state) => {
        state.loading = false;
      })
      //notice banners
      .addCase(fetchNoticeBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNoticeBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.noticeBanners = action.payload;
      })
      .addCase(fetchNoticeBanners.rejected, (state) => {
        state.loading = false;
      })

      //restaurant admin
      .addCase(fetchComboOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComboOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.comboOffers = action.payload;
      })
      .addCase(fetchComboOffer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Average_Rating.pending, (state) => {
        state.loading = true;
      })
      .addCase(Average_Rating.fulfilled, (state, action) => {
        state.loading = false;
        state.averagerating = action.payload;
      })
      .addCase(Average_Rating.rejected, (state) => {
        state.loading = false;
      })
      .addCase(BookDetail_Review.pending, (state) => {
        state.loading = true;
      })
      .addCase(BookDetail_Review.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingreview = action.payload;
      })
      .addCase(BookDetail_Review.rejected, (state) => {
        state.loading = false;
      })

      //sponsored restro
      .addCase(fetchSponsoredRestro.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSponsoredRestro.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsoredRestro = action.payload;
      })
      .addCase(fetchSponsoredRestro.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchDietarydRestro.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDietarydRestro.fulfilled, (state, action) => {
        state.loading = false;
        state.dietaryRestro = action.payload;
      })
      .addCase(fetchDietarydRestro.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchIndvDietary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndvDietary.fulfilled, (state, action) => {
        state.loading = false;
        state.inddietaryRestro = action.payload;
      })
      .addCase(fetchIndvDietary.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchRestaurantChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantChart.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantChart = action.payload;
      })
      .addCase(fetchRestaurantChart.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
      })
      .addCase(fetchStories.rejected, (state) => {
        state.loading = false;
      })

      // Review
      .addCase(Restaurant_Review.pending, (state) => {
        state.loading = true;
      })
      .addCase(Restaurant_Review.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(Restaurant_Review.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default restaurantSlice.reducer;
export const { saveRestroId } = restaurantSlice.actions;
