/* eslint-disable react-refresh/only-export-components */

import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsWallet } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ImMobile, ImMobile2 } from "react-icons/im";
import { MdLocationOn } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { LuStickyNote } from "react-icons/lu";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiHelpscout } from "react-icons/si";
import { TfiEmail } from "react-icons/tfi";
import { FaBicycle, FaCheckCircle, FaUtensils } from "react-icons/fa";

export const Header_content = {
  navLinks: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Help", path: "/help" },
  ] as const,
  icons: [
    { img: "/fav.png", path: "/wishlist" },
    { img: "/cart.png", isCart: true },
  ],
};

// Home page contents start here
// hero component contents

export const Hero_content = {
  title: "Delivery or Takeaway Food",
  subtitle: "The best restaurants at the best price",
  trending: "Trending: Pizza,Khaja set,Burger...",
  button: "Search",
  placeholder: "Address, neighborhood",
};

// popular category component contents
export const Popular_category_content = {
  title: "Popular Categories",
  subtitle: "The best & delicious Food items",
  icons: { left: MdChevronLeft, right: MdChevronRight },
};
export const Special_Package = {
  title: "Food Speciality",
  subtitle:
    "Indulge in our Special Package – A Culinary Journey Beyond Ordinary!",
};

export const PopularHotels = {
  title: "Popular Restaurants",
  subtitle: "Find your perfect accommodations with our wide range of hotels.",
  image: "Hotel.png",
  icon: AiOutlineHeart,
};

export const Combo_Offers = [
  {
    name: "Trisara",
    image: "Hotel2.jpg",
  },
  {
    name: "Diyalo",
    image: "Hotel3.jpg",
  },
  {
    name: "Diyalo",
    image: "Hotel3.jpg",
  },
  {
    name: "Trisara",
    image: "Hotel2.jpg",
  },
];
export const Special_Packages = [
  {
    name: "Royal ",
    image: "Restaurant.png",
  },
  {
    name: "Food Station",
    image: "Restaurant.png",
  },
  {
    name: "Food Station",
    image: "Restaurant.png",
  },
  {
    name: "Royal ",
    image: "Restaurant.png",
  },
];
export const Popular_Category = {
  title: "Combo Offers",
  subtitle: "Combo offers of Restaurant",
};
export const Advertisement = {
  input: [
    {
      label: "Audience",
      placeholder: "Enter Your Home Address",
      type: "String",
      formName: "address",
    },
    {
      label: "Enter street ",
      placeholder: "Enter street ",
      type: "String",
      formName: "street",
    },
    {
      label: "Enter city",
      placeholder: "Enter city",
      type: "String",
      formName: "city",
    },
    {
      label: "Work Address",
      placeholder: "Enter Your Work Address",
      type: "String",
      formName: "address",
    },
    {
      label: "Enter Street",
      placeholder: "Enter Street",
      type: "String",
      formName: "street",
    },
    {
      label: "Enter city",
      placeholder: "Enter city",
      type: "String",
      formName: "city",
    },
  ],
  Address: [
    {
      type: [],
      formName: "preferedDropPoint",
      enum: ["leave_at_door", "meet_at_door", "meet_outside"],
    },
  ],
};
export const Checkout_form = {
  input: [
    {
      label: "Home Address",
      placeholder: "Enter Your Home Address",
      type: "String",
      formName: "address",
    },
    {
      label: "Enter street ",
      placeholder: "Enter street ",
      type: "String",
      formName: "street",
    },
    {
      label: "Enter city",
      placeholder: "Enter city",
      type: "String",
      formName: "city",
    },
    {
      label: "Work Address",
      placeholder: "Enter Your Work Address",
      type: "String",
      formName: "address",
    },
    {
      label: "Enter Street",
      placeholder: "Enter Street",
      type: "String",
      formName: "street",
    },
    {
      label: "Enter city",
      placeholder: "Enter city",
      type: "String",
      formName: "city",
    },
  ],
  Address: [
    {
      type: [],
      formName: "preferedDropPoint",
      enum: ["leave_at_door", "meet_at_door", "meet_outside"],
    },
  ],
};

// top rated restaurant component content
export const Top_rated_restaurant_content = {
  title: "Nearby Restaurants",
  subtitle: "The best restaurant in the Nepal",
  icon: AiOutlineHeart,
};
export const Home_card = {
  Cards: [
    {
      image: "delivery-03.svg",
      Title: "Run Your Listing and Promote",
      Subtitle: "Create a business account",
      path: "./",
    },
    {
      image: "delivery-04.svg",
      Title: "Your Restaurant, Delivered",
      Subtitle: " Add Your Restaurant",
      path: "/restaurant/add",
    },
    {
      image: "delivery-01.svg",
      Title: "Deliver With Koseli",
      Subtitle: "Sign up to deliver",
      path: "/rider/add",
    },
  ],
};
export const Download = [
  {
    title: "Order now or schedule a delivery time",
  },
  {
    title: "Track your order",
  },
  {
    title: "Exclusive offer",
  },
  {
    title: "Online Payment",
  },
  {
    title: "Cash on delivery",
  },
];
export const OrderProcess = {
  Process: [
    {
      Icon: AiOutlineShoppingCart,
      Title: "Place Order",
      Description:
        "Browse through available dishes and add your desired meal to cart",
    },
    {
      Icon: FaCheckCircle,
      Title: "Order Confirmation",
      Description:
        "Our sales representative receives accepts and confirms Your Orders",
    },
    {
      Icon: FaUtensils,
      Title: "We prepare Your Order",
      Description: "Your Order is Immediately prepared for pickups",
    },
    {
      Icon: FaBicycle,
      Title: "Rider Picks Order",
      Description: "Our stand-by riders pickup your order for delivery.",
    },
    {
      Icon: FaCheckCircle,
      Title: "Order Complete",
      Description:
        "Your order is delivered to you in you specifed location.You can track rider and rate rider after a successful delivery.",
    },
  ],
};

// home banner component content
export const Home_banner_content = {
  title: "Koseli Delivery",
  subtitle: "We Deliver to your Home and Offices",
  description: "Enjoy a tasty and fresh food in a minute",
  button: "Start now",
};

// main component content
export const Main_content = {
  order: {
    title: "Easily Order",
    description:
      "Satisfy your cravings with just a few clicks! Welcome to our hassle-free food ordering website, where delicious meals are just moments away. Browse through a diverse range of cuisines, choose your favorites, customize your order, and experience the convenience of having your food delivered right to your doorstep.",
  },
  food: {
    title: "Enjoy Food",
    description:
      "Discover the joy of exceptional dining right here! Welcome to our platform dedicated to helping you truly. We believe that every meal should be a delightful experience, and that's why we've curated a selection of the finest restaurants and culinary offerings for you to explore.",
  },
  delivery: {
    title: "Quick Delivery",
    description:
      "Need it fast? Look no further! Welcome to our Quick Delivery service, where your convenience is our priority. We understand that sometimes, waiting is just not an option. That's why we're dedicated to getting your orders to you in record time.",
  },
  start_order: {
    title: "Start Ordering Now",
    subtitle:
      "Ready to embark on a flavorful journey? It's time to take the first step – Start Ordering Now! Our user-friendly platform is designed to make your ordering experience seamless and enjoyable.",
    description:
      "Say hello to convenience, and goodbye to hunger – it's time to Start Ordering Now! Our curated menu, featuring a diverse array of mouthwatering dishes.",
    button: "Register",
  },
};

// footer component content
export const Footer_content = {
  quick_link: {
    title: "Quick Links",
    quickLinks: [
      { name: "Add your restaurant", path: "/restaurant/add" },
      { name: "Add Rider", path: "/add_rider" },
      { name: "Blog", path: "/page/blog" },
    ],
  },
  category: {
    title: "Categories",
    categoryLinks: [
      { name: "Top Categories", path: "/top_categories" },
      { name: "Best Rated", path: "/best_rated" },
      { name: "Best Price", path: "/best_price" },
      { name: "Latest Submission", path: "/latest_submission" },
    ],
  },
  contact: {
    title: "Contact",
    details: [
      {
        detail: "Pepsicola Manohara Bhaktapur 2208, Nepal",
        icon: AiOutlineHome,
      },
      { detail: "9812345678", icon: ImMobile2 },
      { detail: "koseliapp@gmail.com", icon: TfiEmail },
    ],
  },
  keep_in_touch: {
    title: "Keep In Touch",
    placeholder: "Your email",
  },
  follow: {
    title: "Follow Us on",
  },
  polices: [
    { name: "Terms and Conditions", path: "/term_condition" },
    { name: "Privacy", path: "/privacy" },
    { name: "SiliconTech Pvt. Ltd." },
  ],
  icon: { right: MdChevronRight },
};

// register page content
export const auth_content = {
  btn2: {
    icon: FcGoogle,
    reg_name: "Register with Google",
    log_name: "Sign in with Google",
  },
  input: [
    {
      placeholder: "Enter a username",
      type: "text",
      icon: LiaEdit,
      showLog: false,
      formName: "name",
    },
    {
      placeholder: "Enter phone number",
      type: "text",
      icon: ImMobile,
      showLog: false,
      formName: "phone",
    },
    {
      placeholder: "Enter your email",
      type: "email",
      icon: TfiEmail,
      showLog: true,
      formName: "email",
    },
    {
      placeholder: "Enter your password",
      type: "password",
      icon: RiLockPasswordLine,
      icons:"",
      showLog: true,
      formName: "password",
    },
    {
      placeholder: "Confirm your password",
      type: "password",
      icon: RiLockPasswordLine,
      showLog: false,
      formName: "confirm_pass",
    },
  ],
  log_content: "Don't have an account ?",
  log_submit: "Login",
  reg_submit: "Register Now",
  reg_content: "Already have an account ?",
  reg_forgot: "Forgot Password ?",
  reg_remember: "Remember me",
};

// food_details page content

export const restaurant_grid_content = {
  title: "Paris Eat & Drinks",
  switch_field: {
    label1: "All",
    label2: "Popular",
    label3: "Latest",
    label4: "View on map",
    icon: MdLocationOn,
  },
  search: [
    { placeH: "Terms...", icon: BiSearch },
    { placeH: "Where", icon: MdLocationOn },
  ],
  select_option: ["All Categories", "Restaurants", "Coffee Bars", "Hotels"],
  search_btn: "Search",
  info: [
    {
      icon: SiHelpscout,
      name: "Need Help ? Contact us",
      des: "Cum appareat maiestatis interpretaris et, et sit.",
    },
    {
      icon: BsWallet,
      name: "Payments",
      des: "Cum appareat maiestatis interpretaris et, et sit.",
    },
    {
      icon: LuStickyNote,
      name: "Cancel Policy",
      des: "Cum appareat maiestatis interpretaris et, et sit.",
    },
  ],
};

// cart page content
export const cart_content = {
  setteper: ["Your cart", "Payment", "Finish"],
};

// cart order page content
export const cart_order_content = {
  details: [
    {
      label: "Full Name",
      width: "300px",
      type: "text",
      payment: "Name on card",
    },
    { label: "Your Email", width: "300px", type: "email" },
    { label: "Mobile", width: "300px", type: "text", payment: "Card Number" },
    {
      label: "Full Address",
      width: "300px",
      type: "text",
      payment: "Expiration Date",
      PayPlaceH1: "mm",
      PayPlaceH2: "yyyy",
    },
    { label: "City", width: "300px", type: "text" },
  ],
};
export const CheckoutDetail = {
  form: [
    { placeholder: "Email", type: "email", label: "Email Address", form: "" },
    { placeholder: "Password", type: "password", label: "Password", form: "" },
    {
      placeholder: "Postal Code",
      type: "number",
      label: "Postal Code/Billing zip",
      form: "",
    },
  ],
};

export const About_content = {
  form: [
    { placeholder: "First Name", type: "name" },
    { placeholder: "Last Name", type: "name" },
    { placeholder: "Email", type: "email" },
    { placeholder: "Telephone", type: "tel" },
  ],
};
export const Setting_Form = {
  form: [
    { placeholder: "Full  Name", type: "name" },
    { placeholder: "Phone Number", type: "tel" },
    { placeholder: "Email", type: "email" },
    { placeholder: "Username", type: "name" },
  ],
};

export const adminLoginField = [
  {
    placeholder: "Enter your email",
    type: "email",
    icon: TfiEmail,
    formName: "emailOrUsername",
  },
  {
    placeholder: "Enter your password",
    type: "password",
    icon: RiLockPasswordLine,
    formName: "password",
  },
];

export const subscription = [
  { label: "Price", value: "price" },
  { label: "Duration", value: "duration" },
  {
    label: "Selected Package",
    value: "selectedPlanName",
  },
];

export const statusValues = [
  { label: "Pickup", value: "pickup" },
  { label: "Acknowledged", value: "acknowledged" },
  { label: "Ordered", value: "ordered" },
  { label: "On the way", value: "Ontheway" },
  { label: "Takeway", value: "takeway" },
  { label: "Out of stock", value: "outOfStock" },
  {
    label: "Rejected By restaurant",
    value: "Rejectedbyrestaurant",
  },
  { label: "Cancel by user", value: "cancelByUser" },
  { label: "Completed", value: "completed" },
];

// for dietary
export const dietOptions = [
  "Mediterranean Diet",
  "DASH Diet",
  "Flexitarian Diet",
  "WeightWatchers",
  "MIND Diet",
  "Vegetarian Diet",
  "Noom",
  "New Mayo Clinic Diet",
  "Pescatarian",
  "Ornish Diet",
  "Keto Diet",
  "Paleo Diet",
  "Zone diet",
  "Atkins diet",
  "South beach diet",
  "Intermittent Fasting",
  "Whole30",
  "Plant-Based Diet",
  "Raw Food Diet",
  "High-Protein diet",
];

export const bloodGroupOpt = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O-", "O+"];
   