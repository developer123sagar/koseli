/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

// restaurant add
export type DaySchedule = {
  startTime: Date;
  endTime: Date;
  isClosed: boolean;
  isSameTimeEveryDay?: boolean;
}

export type OpenTime = {
  everyday: DaySchedule;
  sunday: DaySchedule;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  [day: string]: DaySchedule;
}

export type BusinessType = "restaurant" | "privateBussiness";
export interface IRestaurantForm {
  description: string;
  Desh: string;
  dining: boolean;
  email: string;
  geo: {
    type: "Point";
    coordinates: [number, number];
  };
  hasDeliveryCondition: boolean;
  vegetarian: boolean;
  khaltiId: number | null;
  address: string;
  minimumSpentForFreeDelivery: number | null;
  minimumSpentToCheckout: number | null;
  name: string;
  openTime: OpenTime;
  phoneNumber: number | null;
  tags: string[];
  website: string;
  userPickup: boolean;
  logo: string;
  image: string[];
  mainImage: string;
  features: string[];
  averageDeliveryTime: string;
  VAT_PAN: number | null;
  document: string;
  bussinessType: BusinessType;
}


export type RestaurantInputField = {
  name: string;
  type: string;
  placeH: string;
  formName: string;
}

export type BooleanButton = {
  label: string;
  toggleName: string;
}
export type BooleanButtons = {
  label: string;
  toggleName: string;
}

// for restaurant slice
export interface IRestaurant extends IRestaurantForm {
  _id: string;
  type: string;
  averageDeliveryTime: string;
  popularity: number;
  region: string;
  famousFor: string[];
  description: string;
  createdDateTime: Date;
  averageRating: number;
  status: string;
  hasDelivery: boolean;
  isAcceptingOrder?: boolean;
}

export interface ITermsCondition {
  title: string;
  body: string;
}
interface IndvRestType {
  mainImage: string,
  address: string,
  zipCode: string
  name: string,
  vegetarian: boolean
}
export interface IrestaurantSlice {

  restaurantData: IRestaurant[];
  loading: boolean;
  restaurantId: string,

  nearbyData: IRestaurant[],
  popularData: IRestaurant[],
  restaurantNumberData: {
    increment: number,
    currentYearData: number
  },
  restaurantWalletData: any,
  chartData: object
  indvRestaurant: IndvRestType
  restaurantSlots: any
  restaurantTables: any
  tableBooked: any
  restaurantOrder: any
  restInfo: any
  chatClient: any
  totalOrders: any
  reviews: any
  restAdminId: any
  comboOffers: IRestaurant[]
  averagerating: any
  bookingreview: any
  sponsoredRestro: any
  inddietaryRestro: any
  dietaryRestro: any
  indvComboOffer: any
  indvSpecialOffer: any
  noticeBanners: any
  restadminInfo: any
  restaurantChart: any
  story:any
}
export interface Message {
  loading: boolean,
  userChat: any,
  indvChat: any,
  chatAvaliability: any
}[]

// Food add part

export interface IAddon {
  isRequired: boolean;
  isCheckDefault: boolean;
  name: string;
  extraPrice: number | null;
  quantity: number | null;
  extra: string;
  id: string;
}
export interface IFoodForm {
  activeImage: string;
  name: string;
  subTitle: string;
  price: number | null;
  foodCategory: string;
  images: string[];
  minQuantity: number | null;
  keywords: string[];
  foodSpeciality: [];
  foodMakingTime: { minutes: number | null };
  addon: IAddon[],
}

export interface IFoodItem extends IFoodForm {
  _id: string;
  restaurant: string;
  foodCategory: string;
  total: number | null;
  activeStatus: boolean;
  mainImage: string
  extra: string
}

export interface IFoodCategory {
  images: string[];
  _id: string;
  name: string;
  extra: string;
  countryFood: string;
  activeStatus: boolean,
}

export interface IFoodDetailState {
  category: IFoodCategory[];
  allFoodData: IFoodItem[];
  dynamicFoodData: any;
  restaurantFood: IFoodItem[];
  restaurantOrder: [];
  loading: boolean;
  foodNumberData: {
    increment: number,
    currentYearData: number
  },
  orderPercentageData: {
    pickupPercentage: number,
    homeDeliveryPercentage: number
  },
  indvCategory: IFoodCategory,
  catImgDeletionRes: object,
  totalOrders: []
}

export interface IFoodSpeciality {
  name: string;
  createdDateTime: Date;
  _id: string;
  extra: string;
  food: {
    _id: string;
    activeImage: string;
  }
  amount: number | null;
  activeStatus: boolean;

}
interface IFoodSpeciality1 {
  name: string;
  createdDateTime: Date;
  _id: string;
  extra: string;
  amount: number | null;
  activeStatus: boolean;

}

export interface IComboOffers extends IFoodSpeciality1 {
  image: string;
  restaurants: string;
  food: string[];
  expiredAt: Date | string;
}

export interface IComboOffersForm {
  name: string;
  extra: string;
  amount: number | null;
  image: string;
  food: string[];
  expiredAt: Date;
}

// review part
export interface IReview {
  _id: string;
  name: string;
  rating: number;
  review: [],
  activeStatus: boolean;
  rider: {
    name: string;
    photo: string;
    _id: string;

  }

}

// food order
export interface IFoodOrder {
  _id: string
  orderId: string;
  clientId: {
    _id: string;
    name: string;
    email: string;
  };
  deliveryType?: string;
  totalPrice: number;
  createdDateTime: Date;
  status: string;
  paymentStatus: string;
  paymentMode: string;
  restaurantId: {
    _id: string
  }

}

export type FoodInputField = Omit<RestaurantInputField, "placeH">;

// rider part
// export interface IRiderForm {
//   email: string;
//   gender: string;
//   fatherName: string;
//   motherName: string;
//   grandFatherName: string;
//   phone: string;
//   photo: string;
//   name: string;
//   password: string;
//   confirmPassword: string;
//   dob: Date;
// }

interface IAddressRider {
  street: string,
  city: string,
  state: string,
  zipCode: number | null,
}
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O-" | "O+"
export interface IRiderForm {
  Desh: string;
  email: string;
  gender: string;
  bloodGroup: BloodGroup;
  fatherName: string;
  motherName: string;
  grandFatherName: string;
  phone: string;
  photo: string;
  name: string;
  currentAddress: IAddressRider;
  permanentAddress: IAddressRider;
  secondaryPhone: string;
  password: string;
  confirmPassword: string;
  dob: Date;
  license: {
    licenseNo: string;
    frontImage: string;
    backImage: string;
    issuedDate: Date;
    issuedPlace: string;
    expireDate: Date;
  };
  citizenship: {
    citizenshipNo: string;
    frontImage: string;
    backImage: string;
    issuedDate: Date;
    issuedPlace: string
  };
  vehicle: {
    image: string;
    vehicleType: string;
    vehicleNumber: string;
    color: string;
    model: string;
    issuedDate: Date;
    issuedPlace: string;
  };
  blueBook: {
    blueBookNumber: string;
    frontImage: string;
    middleImage: string;
    backImage: string;
    issuedDate: Date;
    expireDate: Date;
  };
  insurance: {
    insuranceNumber: string;
    document: string;
    issuedDate: Date;
    issuedVendor: string;
    expireDate: Date;
    description: string;
  };
  contractDoc: string;
}

export interface IRiderForm2 {
  email: string;
  gender: string;
  image: string[];
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  grandFatherName: string;
  phone: string;
  vehicleNumber: string;
  licenseNumber: string;
  bluebookNumber: string;
  insuranceNumber: string;
  photo: string;
  name: string;
  password: string;
  confirmPassword: string;
  citizenNumber: string;
  dob: Date;
}

export interface IRiders2 extends IRiderForm2 {
  _id: string;
  isVerified: boolean;
  Desh: string;
  status: string;
  rider: {
    _id: string;
    phone: string;
    name: string;
    gender: string;
    status: string;
    joinDate: Date;
    photo: string;
  };
}

export interface IRiders extends IRiderForm {
  _id: string;
  isVerified: boolean;
  Desh: string;
  status: string;
  rider: {
    _id: string;
    phone: string;
    name: string;
    gender: string;
    status: string;
    joinDate: Date;
    photo: string;
  };
}

export interface ISuspendedRider {
  suspendEndDate: Date;
  joinDate: Date;
  status: boolean;
  _id: string;
  mainImage: string;
  phone: string;
  gender: string;
  photo: string;
}
// for advance table
export interface AdvanceTbColumn<T> {
  header: string | React.ReactNode;
  accessor: (data: T) => React.ReactNode;
  render?: (data: React.ReactNode) => React.ReactNode;
}


//   for dynamic table
export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  render?: (data: T[keyof T]) => React.ReactNode;
}

// for toast msg
export type MessageType = {
  id: string;
  msg: string;
  theme: "success" | "warn" | "fail" | "info";
};

// for side bar
export interface MenuItem {
  name: string;
  path?: string;
  icon: IconType;
  role?: string[];
  meter?: number;
}

export interface SidebarItem extends MenuItem {
  submenu?: MenuItem[];
}

//   for cupon code
export interface ICoupon {
  clientId: [],
  status: string[];
  _id: string,
  foodId: string,
  description: string;
  maxUsage: number,
  discount: number,
  startDate: Date,
  endDate: Date,
  restaurantId: string,
  code: string,
  createdAt: Date,
}
export type CuponForm = {
  discount: number | null;
  status: string;
  description: string;
  maxUsage: number | null;
  startDate: Date;
  name: string;
  endDate: Date;
  [key: string]: any;
};


export type ComboType = {
  name: string;
  food: string;
  extra: string;
  expiredAt: Date;
  amount: number | null;
  image: string,
  [key: string]: string | number | null | Date;
};

// user order
export interface IOrderFood {
  identity: string;
  quantity: number;
  name: string;
  unit_price: number;
  total_price: number;
  restaurant: string;
}
export interface IUserOrder {
  food: IOrderFood[];
  totalPrice: number;
  status: string;
  deliveryType: string;
  deliveryCharge: number;
  paymentMode: string;
  paymentStatus: string;
  activeStatus: boolean;
  _id: string;
  orderId: string;
  restaurantId: { _id: string; name: string };
  createdDateTime: Date;
}

//  for dietary
export interface IDietary {
  isHalalCertified: boolean;
  extra: string;
  foodName: string;
  dietaryPlan: string;
  weight: null | number;
  image: string;
  calorie: number | null;
  price: number | null;
  _id?: string;
  dietaryMakingTimeinMinute: number | null;
}

// for payment reducer
export type PaymentMode = "KHALTI" | "CASH_ON_DEVLIVERY" | "STRIPE" | "";
export interface IPaymentInitialState {
  loading: boolean;
  selectedPaymentMethod: PaymentMode;
  isDeliveryformSubmitted: boolean;
  error: string
}

// form saving user delivery form address
export type Address = {
  address: string,
  city: string,
  street: string,
  zipCode: number | null,
  geoLocation: {
    type: "Point",
    coordinates: [number, number]
  },
}
export interface IDeliveryForm {
  home: Address,
  work: Address,
}

export interface ITaxForm {
  name: string;
  tax: number | null;
  desh: string;
  [key: string]: string | Date | null | number
}
export interface ITaxs extends ITaxForm {
  createdDateTime: Date;
  _id: string;
}
// for customer 
export interface ICustomer {
  Desh: string;
  bidingAmount: number;
  name: string;
  region: string;
  joinDate: Date;
  activeStatus: boolean;
  email: string;
  verificationStatus: string;
}

// for log management
export interface ILog {
  geo: {
    lat: string;
    lng: string;
  };
  locationDetail: {
    geo: {
      range: string[];
      timezone: string;
    };
  };
  ip: number;
  createdAt: string;
  orderId: string;
  by?: {
    email: string;
  };
  _id: string;
  country: string;
}

// for rider refer
export interface IEarn {
  referCode: string;
  benefitedAmount: number;
  rider: {
    name: string;
    email: string;
    phone: string;
    photo: string;
    joinDate: Date;
    gender: string;
    verificationStatus: string;
  };

  first: string;
}

// for customer notification
export interface IcustomerNotification {
  campaignName: string;
  title: string;
  createdDateTime: Date;
  expiredAt: string;
  _id: string;
}

// for blog
export interface IBlog {
  createdDateTime?: string;
  activestatus?: boolean;
  title: string;
  images: [string];
  tags: [];
  category: string;
  description: string;
  metaDescription: { name: string }
  _id?: string
}

// for table booking
export type Table = {
  tableNo: string;
  image: string;
  bookingamount: number | null;
  number_of_seats: number | null;
  status?: string;
  _id?: string;
  isBookingOpen?: boolean;
  isbooked?: boolean;
};

export type FormBooking = {
  _id?: string;
  isBookingOpen: boolean;
  table: Table[];
};

// for user management 
export interface IWatcher {
  Email: string;
  Name: string;
  Phone: number;
  verificationStatus: string;
  images: string;
  role: string;
  _id: string;
}


export interface InputProps {
  type?: string;
  value: string | number;
  label: string;
  placeH: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


// // for blog
export interface BlogItem {
  title: string;
  createdDateTime: string;
  description: string;
  author: string;
  category: string;
  images: [];
  _id: string;
}

export interface Review {
  review: string;
  rating: number;
  foodId: {
    activeImage: string;
  };
  user: {
    name: string;
  };
}

export interface IRestaurantReview extends IReview {
  _id: string;
  createdDateTime: Date;
}

export interface Saas_Plan {
  _id: string;
  name: string;
  description: string;
  plans: {
    _id: string;
    name: string;
    description: string;
    price: number;
    Duration: number;
  }[]
}

export interface PlanName {
  _id?: string;
  name: string;
  description: string;
  price: number | null;
  Duration: number | null;
}

// for saas plan details
export interface ISaasPlanDetails {
  name: string, description: string, Duration: number | null; price: number | null;
}

export interface ISubHistory {
  planDetails: ISaasPlanDetails[],
  _id: string
  restaurantName: string
  paymentMode: string
  createdAt: Date;
}

export type TermAndConditionItem = {
  _id: string;
  title: string;
  body: string;
};

export type Privacy = {
  title: string;
  body: string;
};

export interface IAllTable {
  bookingamount: number;
  image: string;
  isbooked: boolean;
  number_of_seats: number;
  status: string;
  tableNo: string;
  _id: string;
  isRemoved?: boolean;
}

// for notice
export interface INotice {
  image: string[];
  _id: string;
  noticetitle: string;
  restaurantId: string;
  Detail: string;
}

// for contact message
export interface IContact {
  message: string;
  _id: string;
  name: string;
  contact: string;
  email: string;
  createdAt: string;
}

// for founder 
export interface IFounder {
  name: string;
  image: string;
  extra: string;
  _id: string;
}

export interface IBookedTable {
  tableId: string[];
  tableNo: string[];
  status: string;
  isBooking: boolean;
  _id: string
  clientId: string;
  date: Date;
  duration: string;
  phone: number;
  email: string;
  clientName: string;
  restaurantId: string;
  amount: number;
  BookingId: string;
  paymentMode: string;
}
export interface IBooking {
  bookedTable: IBookedTable[];
}

// for ads history 
export interface IAdsHistory {
  audience: string[];
  bidingAmount: number;
  paymentStatus: string;
  paymentMode: string;
  _id: string;
  image: string;
  restaurant: {
    image: string[];
    famousFor: [];
    dining: boolean;
    _id: string;
    name: string;
    phoneNumber: string;
    website: string;
    address: string;
    averageDeliveryTime: string;
  };
  geo: {
    type: "Point";
    coordinates: [string, string];
    _id: string;
  };
  advertisementId: string;
  createdDateTime: Date;
  expiryDate: Date;
  khaltiTrans_Id: string;
}

// for search 
export interface Search {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
}

export interface Step {
  label: string;
  component: React.ReactNode;
}
export interface StepProps {
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
}

export interface IVideo {
  _id: string;
  video: string;
  thumbnail: string;
  restaurantId: string;
}