import { Route, Routes } from "react-router-dom";
import LocationPopup from "./components/LocationPopUp/locationPopUp";
import {
  About,
  AdminLogin,
  CartOrder,
  Contact,
  Faq,
  FoodDetails,
  Help,
  Login,
  Register,
  Restaurants,
  Wishlist,
  Search,
  ChangeDeliveryAddress,
  ViewOrder,
  ViewAllTopRestaurant,
  ViewComboOffer,
  BlogDetail,
} from "@/pages";
import BookDetails from "./pages/BookDetails";

import {
  Active,
  ActiveBlog,
  ActiveRiders,
  Actives,
  AddCombo,
  AddNewBlog,
  AddRestaurant,
  AddRider,
  AddTax,
  Add_Restaurant,
  Add_Rider,
  Cancelled,
  CancelledWithdraw,
  Category,
  CompletedOrder,
  ContactMessage,
  CouponCode,
  CustomerEarn,
  CustomerList,
  CustomerNotification,
  CustomerReview,
  Customerquery,
  Dashboard,
  DeliveryEarning,
  Dietary,
  AddFoodSpeciality,
  EditThread,
  ExpiringDocuments,
  Food,
  History,
  LogManagement,
  Pending,
  Request,
  RequestRiders,
  RequestSuspended,
  RiderCancelledWithdraw,
  RiderEarn,
  RiderNotification,
  RiderQuery,
  RiderReview,
  RiderSuccessfulWithdraw,
  RiderWallet,
  RiderWithdrawRequest,
  ScheduleOrder,
  Setting,
  Speciality,
  SuccessfulWithdraw,
  Tax,
  UserManagement,
  VehicleType,
  WithdrawRequest,
  FoodNewOrder,
  AddFounder,
  ViewCategory,
  ViewRestaurant,
  EditRestaurant,
  ViewDietary,
  AddDietary,
  EditDietary,
  ViewFood,
  EditFood,
  ViewFoodSpeciality,
  EditFoodSpeciality,
  ViewCombo,
  EditCombo,
  ViewRider,
  EditRider,
  ViewBlog,
  EditBlog,
  EditTax,
  ViewTax,
  DashboardReview,
  AllTable,
  ViewCustomer,
  EditCutomer,
  ViewUserMgmt,
  EditUserMgmt,
  AddWatcher,
  EditFoodOrder,
  AddNotice,
  EditCoupon,
} from "@/dashboard/page";
import AddCategory from "./dashboard/page/AddRoutes/AddCategory";
import EditCategory from "./dashboard/page/EditRoutes/EditCategory";
import { useEffect, useState } from "react";
import RestaurantReview from "@/dashboard/page/Reviews/RestaurantReview";
import AddFood from "@/dashboard/page/Our Kitchen/AddFood";
import PrivateRoutes, { Role } from "@/routes/PrivateRoute";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import Combo_Offer from "./dashboard/page/Our Kitchen/Combo_offer";
import AddCupon from "./dashboard/page/Coupon/AddCupon";
import OrderSccess from "./pages/OrderSccess";
import DefaultLayout from "./pages/Main";
import UserOrder from "./pages/UserOrder";
import UserProfile from "./pages/UserProfile";
import Terms from "./pages/Terms";
import Privacy_policy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import FilteredSearch from "./pages/filteredSearch";
import AddPromotion from "./dashboard/page/AddRoutes/AddPromotion";
import Saas_Pay from "./dashboard/page/Saas-Pay/Saas_Pay";
import HomeNoLocation from "./components/HomenoLocation/HomeNoLocation";
import CreateTable from "./dashboard/page/AddRoutes/CreateTable";
import BookingPaymentSuccess from "./pages/BookingPaymentSuccess";
import ManageAccount from "./pages/ManageAccount";
import MyProfile from "./pages/MyProfile";
import EditName from "./components/userprofile/EditName";
import Chat from "./dashboard/component/Chat/chat";
import ViewPopularHotel from "./pages/ViewPopularHotel";
import ViewDietries from "./pages/ViewDietries";
import Logout from "./components/userprofile/Logout";
import ViewSepcialPackage from "./pages/viewSpecialPackage";
import Create_Saas_plan from "./dashboard/page/Saas-Pay/Create_Saas_plan";
import EditSaas from "./dashboard/page/EditRoutes/EditSaas";
import AddPlan from "./dashboard/page/Saas-Pay/AddPlan";
import Saas_plan from "./dashboard/page/Saas-Pay/Saas_plan";
import SaasPlan_Details from "./dashboard/page/Saas-Pay/SaasPlan_Details";
import NewBooking from "./dashboard/page/Booking/NewBooking";
import CompleteBooking from "./dashboard/page/Booking/CompleteBooking";
import Founder from "./dashboard/component/Founder/Founder";
import ViewFounder from "./dashboard/page/viewRoutes/ViewFounder";
import EditFounder from "./dashboard/page/EditRoutes/EditFounder";
import ViewSaasPlanDetails from "./dashboard/page/viewRoutes/ViewSaasPlanDetails";
import ViewSaas from "./dashboard/page/viewRoutes/ViewSaas";
import EditSaasPlanDetails from "./dashboard/page/EditRoutes/EditSaasPlanDetails";
import AddTerms from "./dashboard/page/SystemData/AddTerms";
import TermsCond from "./dashboard/page/SystemData/TermsCond";
import ViewTermsCond from "./dashboard/page/viewRoutes/ViewTermsCond";
import EditTermsCond from "./dashboard/page/EditRoutes/EditTermsCond";
import AddPrivacyPolicy from "./dashboard/page/SystemData/AddPrivacy";
import PrivacyAndPolicy from "./dashboard/page/SystemData/PrivacyAndPolicy";
import ViewPrivacy from "./dashboard/page/viewRoutes/ViewPrivacy";
import EditPrivacy from "./dashboard/page/EditRoutes/EditPrivacy";
import Notice from "./dashboard/page/Notice/Notice";
import ViewNotice from "./dashboard/page/viewRoutes/ViewNotice";
import EditNotice from "./dashboard/page/EditRoutes/EditNotice";
import ViewContactMsg from "./dashboard/page/viewRoutes/ViewContactMsg";
import EditPassword from "./components/userprofile/EditPassword";
import ViewTable from "./dashboard/page/viewRoutes/ViewTable";
import EditTable from "./dashboard/page/EditRoutes/EditTable";
import ViewBooking from "./dashboard/page/viewRoutes/ViewBooking";
import CreateAds from "./dashboard/page/Advertisement/CreateAds";
import AdsHistory from "./dashboard/page/Advertisement/AdsHistory";
import ClientPrivate from "./routes/ClientPrivate";
import ViewSubsHistory from "./dashboard/page/viewRoutes/ViewSubsHistory";
import SubsHistory from "./dashboard/page/subscription/SubsHistory";
import ManageRestroProfile from "./pages/ManageRestroProfile";
import ViewCupon from "./dashboard/page/viewRoutes/ViewCupon";

import { ToastMsg } from "./common";
import { removeToastMessage } from "./redux/toast/toastSlice";
import ViewRequestRider from "./dashboard/page/viewRoutes/ViewRequestRider";
import { DashboardLayout } from "./layout";
import ViewFoodOrder from "./dashboard/page/viewRoutes/ViewFoodOrder";
import AddVideo from "./dashboard/page/AddRoutes/AddVideo";
import ViewVideo from "./dashboard/page/viewRoutes/ViewVideo";
import EditVideo from "./dashboard/page/EditRoutes/EditVideo";
import Story from "./components/Story/story";

function App() {
  const role: Role = useAppSelector((state: RootState) => state.signin.role);
  const { token, userToken } = useAppSelector(
    (state: RootState) => state.signin
  );
  const [searchParam, setSearchParam] = useState<string>(" ");
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [askPermission, setAskPermission] = useState(false);
  const [permission, setPermission] = useState(false);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [sliderNumber, setSliderNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const [openSmlFilter, setOpenSmlFilter] = useState(false);
  const dispatch = useAppDispatch();

  const { messages } = useAppSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToastMessage());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messages, dispatch]);

  useEffect(() => {
    if (
      localStorage.getItem("longitude") !== null &&
      localStorage.getItem("latitude") !== null
    ) {
      setPermission(true);
      setLatitude(localStorage.getItem("latitude"));
      setLongitude(localStorage.getItem("longitude"));
    }
  }, []);

  useEffect(() => {
    if (longitude !== null && latitude !== null) setLoading(false);
  }, [longitude, latitude]);

  return (
    <>
      <ToastMsg messages={messages} />
      <>
        <>
          <Routes>
            <Route path="/dashboardnew" element={<DefaultLayout />} />
            <Route
              path="/about"
              element={
                <About
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route path="Faq" element={<Faq />} />
            <Route
              path="/help"
              element={
                <Help
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/blogDetail/:blogid"
              element={
                <BlogDetail
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route
              path="/cart/order"
              element={
                <CartOrder
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  setCurrentDay={setCurrentDay}
                  setSelectedTimeSlot={setSelectedTimeSlot}
                />
              }
            />
            <Route
              path="/footer/terms"
              element={
                <Terms
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route path="/story/:id" element={<Story />}></Route>
            <Route
              path="/footer/privacypolicy"
              element={
                <Privacy_policy
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route
              path="/food_details/:name"
              element={
                <FoodDetails
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route
              path="/food_details/comboDetails/:name"
              element={
                <FoodDetails
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                  toComboOffer={true}
                />
              }
            />
            <Route
              path="/food_details/specialDetails/:name"
              element={
                <FoodDetails
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                  toSpecialPackage={true}
                />
              }
            />

            <Route
              path="/book_details/:id"
              element={
                <BookDetails
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route
              path="/manageaccount"
              element={
                <ManageAccount
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                  role={role}
                />
              }
            />
            <Route path="/editname" element={<EditName />} />
            <Route
              path="/combooffers"
              element={
                <ViewComboOffer
                  searchParam={searchParam}
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route
              path="/specialpackages"
              element={
                <ViewSepcialPackage
                  searchParam={searchParam}
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route
              path="/dietries"
              element={
                <ViewDietries
                  searchParam={searchParam}
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route
              path="/popularhotel"
              element={
                <ViewPopularHotel
                  searchParam={searchParam}
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route
              path="/toprestaurant"
              element={
                <ViewAllTopRestaurant
                  latitude={latitude}
                  longitude={longitude}
                  setSearchParam={setSearchParam}
                  searchParam={searchParam}
                  permission={permission}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route
              path="/vieworder"
              element={
                <ViewOrder
                  latitude={latitude}
                  longitude={longitude}
                  setSearchParam={setSearchParam}
                  permission={permission}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route
              path="/"
              element={
                <HomeNoLocation
                  latitude={latitude}
                  longitude={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setAskPermission={setAskPermission}
                  setPermission={setPermission}
                  setSelectedTimeSlot={setSelectedTimeSlot}
                  setCurrentDay={setCurrentDay}
                  permission={permission}
                  token={userToken}
                  loading={loading}
                  setSliderNumber={setSliderNumber}
                  askPermission={askPermission}
                  scrollDown={scrollDown}
                  setScrollDown={setScrollDown}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/all_restaurant" element={<Restaurants />} />
            <Route
              path="/restaurant/add"
              element={
                <Add_Restaurant
                  latitude={latitude}
                  longitude={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  permission={permission}
                  setSliderNumber={setSliderNumber}
                  setScrollDown={setScrollDown}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                />
              }
            />
            <Route
              path="/rider/add"
              element={
                <Add_Rider
                  latitude={latitude}
                  longitude={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  permission={permission}
                  setSliderNumber={setSliderNumber}
                  setScrollDown={setScrollDown}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                />
              }
            />
            <Route path="/order/success/*" element={<OrderSccess />} />
            <Route element={<ClientPrivate token={token} role={role} />}>
              <Route
                path="/rest_details/:catName"
                element={
                  <Search
                    searchParam={searchParam}
                    longitude={longitude}
                    latitude={latitude}
                    permission={permission}
                    setSearchParam={setSearchParam}
                    currentDay={currentDay}
                    selectedTimeSlot={selectedTimeSlot}
                    sliderNumber={sliderNumber}
                    setSliderNumber={setSliderNumber}
                    setLongitude={setLongitude}
                    setLatitude={setLatitude}
                    setPermission={setPermission}
                    setScrollDown={setScrollDown}
                    openSmlFilter={openSmlFilter}
                    setOpenSmlFilter={setOpenSmlFilter}
                  />
                }
              />
              <Route
                path="/filteredSearch/:catName/:searchParam"
                element={
                  <FilteredSearch
                    latitude={latitude}
                    longitude={longitude}
                    setSearchParam={setSearchParam}
                    currentDay={currentDay}
                    selectedTimeSlot={selectedTimeSlot}
                    permission={permission}
                    sliderNumber={sliderNumber}
                    setSliderNumber={setSliderNumber}
                    setLongitude={setLongitude}
                    setLatitude={setLatitude}
                    setScrollDown={setScrollDown}
                    setPermission={setPermission}
                  />
                }
              />
            </Route>

            <Route
              path="/change/deliveryAddress"
              element={
                <ChangeDeliveryAddress
                  latitude={latitude}
                  longitude={longitude}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  permission={permission}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setScrollDown={setScrollDown}
                  setPermission={setPermission}
                />
              }
            />
            <Route path="/myorders" element={<UserOrder />} />
            <Route
              path="/userprofile"
              element={
                <UserProfile
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                  role={role}
                />
              }
            />

            <Route path="/profile" element={<MyProfile />} />
            <Route
              path="/page/blog"
              element={
                <Blog
                  latitude={latitude}
                  longitude={longitude}
                  permission={permission}
                  setSearchParam={setSearchParam}
                  currentDay={currentDay}
                  selectedTimeSlot={selectedTimeSlot}
                  sliderNumber={sliderNumber}
                  setSliderNumber={setSliderNumber}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setPermission={setPermission}
                  setScrollDown={setScrollDown}
                />
              }
            />
            <Route path="/logout" element={<Logout />} />

            {/* dashboard part routes */}
            <Route element={<PrivateRoutes token={token} role={role} />}>
              <Route element={<DashboardLayout />}>
                <Route
                  path="/dashboard/promotion/addpromotion"
                  element={<AddPromotion />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/food/neworder"
                  element={<FoodNewOrder />}
                />
                <Route path="dashboard/add-founder" element={<AddFounder />} />
                <Route path="/dashboard/founder" element={<Founder />} />
                <Route path="/dashboard/notice/add" element={<AddNotice />} />
                <Route path="/dashboard/notice" element={<Notice />} />
                <Route
                  path="/dashboard/food/scheduleorder"
                  element={<ScheduleOrder />}
                />
                <Route
                  path="/dashboard/advertisement/history"
                  element={<AdsHistory />}
                />
                <Route
                  path="/dashboard/food/completeorder"
                  element={<CompletedOrder />}
                />
                <Route
                  path="/dashboard/restaurant/active"
                  element={<Active />}
                />
                <Route
                  path="/dashboard/restaurant/active"
                  element={<Active />}
                />
                <Route
                  path="/dashboard/restaurant/request"
                  element={<Request />}
                />
                <Route path="/dashboard/kitchen/food" element={<Food />} />

                <Route
                  path="/dashboard/kitchen/category"
                  element={<Category />}
                />
                <Route
                  path="/dashboard/kitchen/dietary"
                  element={<Dietary />}
                />
                <Route
                  path="/restroprofile"
                  element={<ManageRestroProfile />}
                />
                <Route
                  path="/dashboard/kitchen/speciality"
                  element={<Speciality />}
                />
                <Route path="/dashboard/rides/active" element={<Actives />} />
                <Route path="/dashboard/rides/pending" element={<Pending />} />
                <Route path="/dashboard/rides/history" element={<History />} />
                <Route
                  path="/dashboard/rides/cancelled"
                  element={<Cancelled />}
                />
                <Route
                  path="/dashboard/subscription/pay"
                  element={<Saas_Pay />}
                />
                <Route
                  path="/dashboard/subscription/history"
                  element={<SubsHistory />}
                />
                <Route
                  path="/dashboard/saas-plan/create"
                  element={<Create_Saas_plan />}
                />
                <Route path="/dashboard/saas-plan" element={<Saas_plan />} />
                <Route
                  path="/dashboard/riders/activeriders"
                  element={<ActiveRiders />}
                />
                <Route
                  path="/dashboard/riders/requestriders"
                  element={<RequestRiders />}
                />
                <Route
                  path="/dashboard/riders/requestsuspended"
                  element={<RequestSuspended />}
                />
                <Route
                  path="/dashboard/riders/expiring_document"
                  element={<ExpiringDocuments />}
                />
                <Route
                  path="/dashboard/system_data/term_condition"
                  element={<TermsCond />}
                />
                <Route path="/dashboard/riders/add" element={<AddRider />} />
                <Route
                  path="/dashboard/rider_withdraw/cancel"
                  element={<RiderCancelledWithdraw />}
                />

                <Route
                  path="/dashboard/rider_withdraw/success"
                  element={<RiderSuccessfulWithdraw />}
                />
                <Route
                  path="/dashboard/rider_withdraw/request"
                  element={<RiderWithdrawRequest />}
                />
                <Route
                  path="/dashboard/restaurant_withdraw/success"
                  element={<SuccessfulWithdraw />}
                />
                <Route
                  path="/dashboard/restaurant_withdraw/cancel"
                  element={<CancelledWithdraw />}
                />
                <Route
                  path="/dashboard/restaurant_withdraw/request"
                  element={<WithdrawRequest />}
                />
                <Route
                  path="/dashboard/edit_community"
                  element={<EditThread />}
                />
                <Route
                  path="/dashboard/log_management"
                  element={<LogManagement />}
                />
                <Route
                  path="/dashboard/user_management"
                  element={<UserManagement />}
                />
                <Route
                  path="/dashboard/contact_message"
                  element={<ContactMessage />}
                />
                <Route
                  path="/dashboard/query/customer"
                  element={<Customerquery />}
                />
                <Route path="/dashboard/query/rider" element={<RiderQuery />} />
                <Route
                  path="/dashboard/push_notification/sendNotification"
                  element={<CustomerNotification />}
                />
                <Route
                  path="/dashboard/system_data/privacy_policy"
                  element={<PrivacyAndPolicy />}
                />
                <Route
                  path="/dashboard/push_notification/rider"
                  element={<RiderNotification />}
                />
                <Route path="/dashboard/blog/active" element={<ActiveBlog />} />
                <Route
                  path="/dashboard/blog/add_new"
                  element={<AddNewBlog />}
                />
                <Route
                  path="/dashboard/refer_earn/customer"
                  element={<CustomerEarn />}
                />
                <Route
                  path="/dashboard/refer_earn/rider"
                  element={<RiderEarn />}
                />
                <Route path="/dashboard/cupon/code" element={<CouponCode />} />
                <Route path="/dashboard/video/upload" element={<AddVideo />} />
                <Route path="/dashboard/cupon/add" element={<AddCupon />} />
                <Route path="/dashboard/system_data/tax" element={<Tax />} />
                <Route
                  path="/dashboard/system_data/privacy_policy/add"
                  element={<AddPrivacyPolicy />}
                />
                <Route
                  path="/dashboard/system_data/term_condition/add"
                  element={<AddTerms />}
                />
                <Route
                  path="/dashboard/system_data/vehicle_type"
                  element={<VehicleType />}
                />
                <Route
                  path="/dashboard/kitchen/speciality"
                  element={<Speciality />}
                />
                <Route
                  path="/dashboard/customer_list"
                  element={<CustomerList />}
                />
                <Route
                  path="/dashboard/restaurant/review"
                  element={<DashboardReview />}
                />
                <Route
                  path="/dashboard/reviews/customer_review"
                  element={<CustomerReview />}
                />
                <Route
                  path="/dashboard/reviews/rider_review"
                  element={<RiderReview />}
                />
                <Route
                  path="/dashboard/reviews/restaurant_review"
                  element={<RestaurantReview />}
                />
                <Route
                  path="/dashboard/reviews/restaurant_review"
                  element={<RestaurantReview />}
                />
                <Route
                  path="/dashboard/booking/table/all"
                  element={<AllTable />}
                />
                <Route path="/dashboard/booking/new" element={<NewBooking />} />
                <Route
                  path="/dashboard/booking/completed"
                  element={<CompleteBooking />}
                />
                <Route
                  path="/dashboard/kitchen/dietary/add"
                  element={<AddDietary />}
                />
                <Route
                  path="/dashboard/kitchen/speciality/add"
                  element={<AddFoodSpeciality />}
                />
                <Route
                  path="/dashboard/kitchen/category/add"
                  element={<AddCategory />}
                />
                <Route
                  path="/dashboard/saas-plan/add-plan"
                  element={<AddPlan />}
                />
                <Route
                  path="/dashboard/payment/delivery_earning"
                  element={<DeliveryEarning />}
                />
                <Route
                  path="/dashboard/payment/rider_wallet"
                  element={<RiderWallet />}
                />
                <Route path="/dashboard/setting" element={<Setting />} />
                <Route
                  path="/dashboard/kitchen/combo-offer"
                  element={<Combo_Offer />}
                />
                <Route
                  path="/dashboard/saas-plan/planDetails"
                  element={<SaasPlan_Details />}
                />
                {/* dashboard add routes  */}
                <Route
                  path="/dashboard/restaurant/add"
                  element={<AddRestaurant />}
                />
                <Route
                  path="/dashboard/kitchen/combo-offer/add"
                  element={<AddCombo />}
                />
                <Route
                  path="/dashboard/booking/table/create"
                  element={<CreateTable />}
                />
                <Route
                  path="/dashboard/kitchen/food/add"
                  element={<AddFood />}
                />
                <Route
                  path="/dashboard/system_data/tax/add"
                  element={<AddTax />}
                />
                <Route
                  path="/dashboard/advertisement/create"
                  element={<CreateAds />}
                />
                {/* dashboard view page */}
                <Route
                  path="/dashboard/kitchen/category/view/:categoryId"
                  element={<ViewCategory />}
                />
                <Route
                  path="/dashboard/video/myvideo"
                  element={<ViewVideo />}
                />
                <Route
                  path="/dashboard/rider/request/view/:riderId"
                  element={<ViewRequestRider />}
                />
                <Route
                  path="/dashboard/cupon/code/view/:code"
                  element={<ViewCupon />}
                />
                <Route
                  path="/dashboard/subscription/history/view/:name"
                  element={<ViewSubsHistory />}
                />
                <Route
                  path="/dashboard/booking/view/:booking"
                  element={<ViewBooking />}
                />
                <Route
                  path="/dashboard/notice/view/:notice"
                  element={<ViewNotice />}
                />

                <Route
                  path="/dashboard/restaurant/view/:restaurantName"
                  element={<ViewRestaurant />}
                />
                <Route
                  path="/dashboard/kitchen/dietary/view/:dietaryName"
                  element={<ViewDietary />}
                />
                <Route
                  path="/dashboard/food/neworder/view/:foodorder"
                  element={<ViewFoodOrder />}
                />
                <Route
                  path="/dashboard/booking/table/view/:table"
                  element={<ViewTable />}
                />
                <Route
                  path="/dashboard/kitchen/food/view/:foodName"
                  element={<ViewFood />}
                />
                <Route
                  path="/dashboard/saas-plan/planDetails/:saasPlanDetails"
                  element={<ViewSaasPlanDetails />}
                />
                <Route
                  path="/dashboard/kitchen/speciality/view/:specialityName"
                  element={<ViewFoodSpeciality />}
                />
                <Route
                  path="/dashboard/kitchen/combo-offer/view/:comboName"
                  element={<ViewCombo />}
                />
                <Route
                  path="/dashboard/contact_message/view/:msg"
                  element={<ViewContactMsg />}
                />
                <Route
                  path="/dashboard/system_data/privacy_policy/view/:name"
                  element={<ViewPrivacy />}
                />
                <Route
                  path="/dashboard/rider/view/:riderid"
                  element={<ViewRider />}
                />
                <Route
                  path="/dashboard/blog/view/:blogName"
                  element={<ViewBlog />}
                />
                <Route
                  path="/dashboard/system_data/tax/view/:taxName"
                  element={<ViewTax />}
                />
                <Route
                  path="/dashboard/customer_list/view/:customer"
                  element={<ViewCustomer />}
                />
                <Route
                  path="/dashboard/user_management/view/:watcher"
                  element={<ViewUserMgmt />}
                />
                <Route
                  path="/dashboard/founder/view/:foundername"
                  element={<ViewFounder />}
                />
                <Route
                  path="/dashboard/system_data/term_condition/view/:name"
                  element={<ViewTermsCond />}
                />
                <Route
                  path="/dashboard/saas-plan/view/:saasName"
                  element={<ViewSaas />}
                />

                {/* dashboard edit page */}
                <Route
                  path="/dashboard/kitchen/category/edit/:id"
                  element={<EditCategory />}
                />
                <Route
                  path="/dashboard/video/myvideo/edit/:id"
                  element={<EditVideo />}
                />
                <Route
                  path="/dashboard/kitchen/planDetails/edit/:name"
                  element={<EditSaasPlanDetails />}
                />
                <Route
                  path="/dashboard/restaurant/edit/:restro"
                  element={<EditRestaurant />}
                />
                <Route
                  path="/dashboard/founder/edit/:founder"
                  element={<EditFounder />}
                />
                <Route
                  path="/dashboard/system_data/privacy_policy/edit/:name"
                  element={<EditPrivacy />}
                />
                <Route
                  path="/dashboard/kitchen/dietary/edit/:dietaryName"
                  element={<EditDietary />}
                />
                <Route
                  path="/dashboard/kitchen/food/edit/:foodName"
                  element={<EditFood />}
                />
                <Route
                  path="/dashboard/notice/edit/:notice"
                  element={<EditNotice />}
                />
                <Route
                  path="/dashboard/kitchen/speciality/edit/:specialityName"
                  element={<EditFoodSpeciality />}
                />
                <Route
                  path="/dashboard/kitchen/combo-offer/edit/:comboName"
                  element={<EditCombo />}
                />
                <Route
                  path="/dashboard/rider/edit/:riderName"
                  element={<EditRider />}
                />
                <Route
                  path="/dashboard/blog/edit/:blogName"
                  element={<EditBlog />}
                />
                <Route
                  path="/dashboard/system_data/tax/edit/:taxName"
                  element={<EditTax />}
                />
                <Route
                  path="/dashboard/customer_list/edit/:customerName"
                  element={<EditCutomer />}
                />
                <Route path="/editPassword" element={<EditPassword />} />
                <Route
                  path="/dashboard/user_management/edit/:watcher"
                  element={<EditUserMgmt />}
                />
                <Route
                  path="/dashboard/food/neworder/edit/:orderId"
                  element={<EditFoodOrder />}
                />

                <Route
                  path="/dashboard/saas-plan/edit/:name"
                  element={<EditSaas />}
                />
                <Route
                  path="/dashboard/cupon/code/edit/:cupon"
                  element={<EditCoupon />}
                />
                <Route
                  path="/dashboard/booking/table/edit/:name"
                  element={<EditTable />}
                />
                <Route
                  path="/dashboard/system_data/term_condition/edit/:name"
                  element={<EditTermsCond />}
                />

                <Route
                  path="/dashboard/watcher/create"
                  element={<AddWatcher />}
                />
                <Route path="/dashboard/restaurant/chat" element={<Chat />} />
              </Route>
            </Route>
            <Route
              path="/booking/success/:status"
              element={<BookingPaymentSuccess />}
            />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </>
        <LocationPopup
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setPermission={setPermission}
          permission={permission}
          askPermission={askPermission}
          setLoading={setLoading}
          setAskPermission={setAskPermission}
        />
      </>
    </>
  );
}

export default App;
