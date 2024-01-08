
import { AiOutlineMessage, AiOutlineMail, AiOutlineMoneyCollect, AiOutlineCheckSquare, AiOutlineStar, AiFillCar, AiOutlineUsergroupAdd, AiOutlineGlobal, AiOutlineHome, AiOutlineUser, AiOutlineDingtalk } from "react-icons/ai";
import { BiSolidTruck, BiMoneyWithdraw, BiCategory, BiMap } from "react-icons/bi";
import { BsDatabaseCheck, BsPencilSquare, BsChatLeftDots, BsPhone } from "react-icons/bs";
import { FaPersonBiking, FaCodePullRequest, FaMedal } from "react-icons/fa6";
import { FaRegMoneyBillAlt, FaVideo } from "react-icons/fa";
import { FcAdvertising, FcUpload } from "react-icons/fc";
import { MdDinnerDining } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import {
  GiFoodTruck,
  GiFullPizza,
  GiKitchenKnives,
  GiTakeMyMoney,
  GiSplitCross,
} from "react-icons/gi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { GrRestaurant } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { IoRestaurant, IoFastFoodOutline, IoManOutline } from "react-icons/io5";
import {
  MdAttachMoney,
  MdOutlineManageAccounts,
  MdDownloading,
  MdOutlinePayment,
  MdOutlineFreeCancellation,
  MdOutlinePendingActions,
  MdOutlineFoodBank,
  MdPendingActions,
  MdOutlineManageHistory,
  MdOutlineCancel,
  MdOutlinePreview,
  MdOutlinePolicy,
} from "react-icons/md";
import { PiUserList, PiHoodieThin } from "react-icons/pi";
import { RiCoupon2Line, RiSecurePaymentLine } from "react-icons/ri";
import { RiCoupon3Line } from "react-icons/ri";
import { SiGoogletagmanager } from "react-icons/si";
import { TbListDetails, TbReceiptTax } from "react-icons/tb"
import { VscCompassActive, VscPreview, VscRequestChanges } from "react-icons/vsc"
import { SlSupport } from "react-icons/sl";
import { LuVideo } from "react-icons/lu";

export const Sidebar_data = [
  {
    name: "Dashboard",
    icon: RxDashboard,
    path: "/dashboard",
    role: ["admin", "organizer", "restaurant", "watcher"],
  },
  {
    name: "Food Orders",
    icon: GiFoodTruck,
    meter: true,
    submenu: [
      {
        name: "New Order",
        icon: MdDownloading,
        path: "/dashboard/food/neworder",
        role: ["admin", "organizer", "restaurant", "watcher"],

      },
      {
        name: "Scheduled Order",
        icon: MdOutlinePendingActions,
        path: "/dashboard/food/scheduleorder",
        role: ["admin", "organizer", "restaurant", "watcher"],

      },
      {
        name: "Completed Orders",
        icon: AiOutlineCheckSquare,
        path: "/dashboard/food/completeorder",
        role: ["admin", "organizer", "restaurant", "watcher"],

      },
    ],
    role: ["admin", "organizer", "restaurant", "watcher"],
  },
  {
    name: "Restaurants",
    icon: GrRestaurant,
    submenu: [
      {
        name: "Active",
        icon: IoRestaurant,
        path: "/dashboard/restaurant/active",
        role: ["admin", "organizer"],

      },
      {
        name: "Request",
        icon: FaCodePullRequest,
        path: "/dashboard/restaurant/request",
        role: ["admin"],

      },
    ],
    role: ["admin", "organizer"],
  },
  {
    name: "Our Kitchen",
    icon: GiKitchenKnives,
    submenu: [
      {
        name: "Dietary",
        icon: PiHoodieThin,
        path: "/dashboard/kitchen/dietary",
        role: ["restaurant"],
      },
      {
        name: "Speciality",
        icon: MdOutlineFoodBank,
        path: "/dashboard/kitchen/speciality",
        role: ["restaurant"],
      },
      {
        name: "Food",
        icon: IoFastFoodOutline,
        path: "/dashboard/kitchen/food",
        role: ["restaurant"],
      },
      {
        name: "ComboOffer",
        icon: GiFullPizza,
        path: "/dashboard/kitchen/combo-offer",
        role: ["restaurant"],
      },
    ],
    role: ["restaurant"],
  },
  {
    name: "Video",
    icon: FaVideo,
    submenu: [
      {
        name: "Upload Video",
        icon: FcUpload,
        path: "/dashboard/video/upload",
        role: ["restaurant"],
      },
      {
        name: "My Video",
        icon: LuVideo,
        path: "/dashboard/video/myvideo",
        role: ["restaurant"],
      },
    ],
    role: ["restaurant"],
  },
  {
    name: "Category",
    icon: BiCategory,
    path: "/dashboard/kitchen/category",
    role: ["admin"],
  },
  {
    name: "Rides",
    icon: FaPersonBiking,
    submenu: [
      {
        name: "Pending",
        icon: MdPendingActions,
        path: "/dashboard/rides/pending",
        role: ["admin"]
      },
      {
        name: "Active",
        icon: VscCompassActive,
        path: "/dashboard/rides/active",
        role: ["admin"]
      },
      {
        name: "History",
        icon: MdOutlineManageHistory,
        path: "/dashboard/rides/history",
        role: ["admin"],
      },
      {
        name: "Cancelled",
        icon: MdOutlineCancel,
        path: "/dashboard/rides/cancelled",
        role: ["admin"],
      },
    ],
    role: ["admin"],
  },
  {
    name: "Riders",
    icon: BiSolidTruck,
    submenu: [
      {
        name: "Active",
        icon: VscCompassActive,
        path: "/dashboard/riders/activeriders",
        role: ["admin"]
      },
      {
        name: "Request",
        icon: FaCodePullRequest,
        path: "/dashboard/riders/requestriders",
        role: ["admin"]

      },

    ],
    role: ["admin"],
  },
  {
    name: "Payment",
    icon: RiSecurePaymentLine,
    submenu: [
      {
        name: "Delivery Earning",
        icon: AiOutlineMoneyCollect,
        path: "/dashboard/payment/delivery_earning",
        role: ["rider"]
      },
      {
        name: "Rider Wallet",
        icon: FaRegMoneyBillAlt,
        path: "/dashboard/payment/rider_wallet",
        role: ["admin"]
      },
    ],
    role: ["admin", "rider"],
  },
  {
    name: "Restaurant Withdraw",
    icon: BiMoneyWithdraw,
    submenu: [
      {
        name: "Request",
        icon: VscRequestChanges,
        path: "/dashboard/restaurant_withdraw/request",
        role: ["admin", "restaurant"]
      },
      {
        name: "Successful",
        icon: AiOutlineCheckSquare,
        path: "/dashboard/restaurant_withdraw/success",
        role: ["admin", "restaurant"]
      },
      {
        name: "Cancelled",
        icon: GiSplitCross,
        path: "/dashboard/restaurant_withdraw/cancel",
        role: ["admin", "restaurant"]
      },
    ],
    role: ["admin"],

  },
  {
    name: "Tables",
    icon: MdDinnerDining,
    path: "/dashboard/booking/table/all",
    role: ["restaurant"]
  },
  {
    name: "Bookings",
    icon: MdDinnerDining,
    path: "/dashboard/booking/new",
    role: ["admin", "restaurant"]
  },
  {
    name: "Rider Withdraw",
    icon: MdAttachMoney,
    path: "/dashboard/rider_withdraw/success",
    role: ["admin"],
  },
  {
    name: "Reviews",
    icon: MdOutlinePreview,
    submenu: [
      {
        name: "Rider Review",
        icon: AiFillCar,
        path: "/dashboard/reviews/rider_review",
        role: ["admin"]
      },
      {
        name: "Customer Review",
        icon: IoManOutline,
        path: "/dashboard/reviews/customer_review",
        role: ["admin", "restaurant"]
      },
    ],
    role: ["admin"],
  },
  {
    name: "Notice",
    icon: RiCoupon2Line,
    path: "/dashboard/notice",
    role: ["admin"],
  },
  {
    name: "Coupon Code",
    icon: RiCoupon3Line,
    path: "/dashboard/cupon/code",
    role: ["restaurant"],
  },

  {
    name: "Refer and Earn",
    icon: GiTakeMyMoney,
    submenu: [
      {
        name: "Customer",
        icon: IoManOutline,
        path: "/dashboard/refer_earn/customer", role: ["admin"]
      },
      { name: "Rider", icon: AiFillCar, path: "/dashboard/refer_earn/rider", role: ["admin"] },
    ],
    role: ["admin"],
  },
  {
    name: "Push Notification",
    icon: IoIosNotifications,
    path: "/dashboard/push_notification/sendNotification",
    role: ["admin"],
  },
  {
    name: "Contact Message",
    icon: AiOutlineMessage,
    path: "/dashboard/contact_message",
    role: ["admin"],
  },
  {
    name: "System Users",
    icon: MdOutlineManageAccounts,
    path: "/dashboard/user_management",
    role: ["admin", "watcher", "organizer"],
  },
  {
    name: "Customer List",
    icon: PiUserList,
    path: "/dashboard/customer_list",
    role: ["admin", "watcher"],
  },
  {
    name: "Blog",
    icon: ImBlog,
    path: "/dashboard/blog/active",
    role: ["admin", "watcher", "organizer"],
  },
  {
    name: "Log Management",
    icon: SiGoogletagmanager,
    path: "/dashboard/log_management",
    role: ["admin"],
  },
  {
    name: "System Data",
    icon: BsDatabaseCheck,
    submenu: [

      { name: "Tax", icon: TbReceiptTax, path: "/dashboard/system_data/tax", role: ["admin"] },
      {
        name: "Terms & Condition",
        icon: BsPencilSquare,
        path: "/dashboard/system_data/term_condition",
        role: ["admin"]
      },
      {
        name: "Privacy Policy",
        icon: MdOutlinePolicy,
        path: "/dashboard/system_data/privacy_policy",
        role: ["admin"]
      },
    ],
    role: ["admin"],
  },
  {
    name: "Advertisement History",
    icon: FcAdvertising,
    role: ["restaurant"],
    path: "/dashboard/advertisement/history",
  },
  {
    name: "SAAS-Plan",
    icon: MdOutlinePayment,
    role: ["admin"],
    submenu: [
      {
        name: "Saas_Plan",
        icon: AiOutlineDingtalk,
        path: "/dashboard/saas-plan",
        role: ["admin", "restaurant"]
      },
      {
        name: "Plan Details",
        icon: TbListDetails,
        path: "/dashboard/saas-plan/planDetails",
        role: ["admin"]
      },
    ]
  },
  {
    name: "Subscription History",
    icon: MdOutlinePayment,
    path: "/dashboard/subscription/history",
    role: ["restaurant", "admin"],
  },
  {
    name: "Founder",
    icon: AiOutlineUser,
    path: "/dashboard/founder",
    role: ["admin"],

  },
  {
    name: "Review",
    icon: AiOutlineStar,
    path: "/dashboard/reviews/restaurant_review",
    role: ["restaurant"],
  },
  {
    name: "Chat",
    icon: IoChatbubbleEllipses,
    path: "/dashboard/restaurant/chat",
    role: ["restaurant"]
  },
];

export const AboutData = [
  {
    icon: FaMedal,
    name: "+1000 Customers",
    description: " Savor culinary delights at our world-class restaurant, where our talented chefs craft dishes inspired by both local and international flavors. Whether it's a business lunch or a romantic dinner, we cater to all tastes.",
  },
  {
    icon: SlSupport,
    name: "H24 Support",
    description: " Indulge in our well-appointed rooms and suites, each designed for your utmost comfort. Enjoy modern amenities, breathtaking views, and plush furnishings that make your stay truly exceptional..",
  },
  {
    icon: AiOutlineHome,
    name: "+575 location",
    description: " adjusting the classes to match your design preferences.",
  },
  {
    icon: SlSupport,
    name: "Help Direct Line",
    description: " Indulge in our well-appointed rooms and suites, each designed for your utmost comfort. Enjoy modern amenities, breathtaking views, and plush furnishings that make your stay truly exceptional..",
  },
  {
    icon: MdOutlinePayment,
    name: "Secure Payments",
    description: " We offer state-of-the-art facilities for conferences, weddings, and special occasions. Our dedicated event team ensures that every detail is perfect, creating lasting memories.",
  },
  {
    icon: BsChatLeftDots,
    name: "Support via Chat",
    description: " Indulge in our well-appointed rooms and suites, each designed for your utmost comfort. Enjoy modern amenities, breathtaking views, and plush furnishings that make your stay truly exceptional..",
  },
];

export const Founders = [
  {
    name: "Sudikshya kafle",
    image: "Founder_image.jpg",
    role: "CEO",
  },
  {
    name: "Sudikshya kafle",
    image: "Founder_image.jpg",
    role: "CEO",
  },
  {
    name: "Sudikshya kafle",
    image: "Founder_image.jpg",
    role: "CEO",
  },
  {
    name: "Sudikshya kafle",
    image: "Founder_image.jpg",
    role: "CEO",
  },
  {
    name: "Sudikshya kafle",
    image: "Founder_image.jpg",
    role: "CEO",
  },

];
export const Address = [
  {
    icon: BiMap,
    name: "Address",
    Detail: "TownPlanning,Pepsicola",
  },
  {
    icon: AiOutlineMail,
    name: "Email Address",
    Detail: "koseli@gmail.com",
  },
  {
    icon: BsPhone,
    name: "Contact info",
    Detail: "+977 9863900782",
  },
];
export const Faq = [
  {
    name: "Payments",
    image: "pay.png",
  },
  {
    name: "Suggestion",
    image: "suggestion.png",
  },
  {
    name: "Recommendations",
    image: "recommendation.png",
  },
  {
    name: "Terms&conditions",
    image: "",
  },
  {
    name: "Booking",
    image: "",
  },
];

export const Faq_Content = {
  payment: {
    heading: "Payment",
    intro: [
      { title: "intorduction", des: "hello" },
      { title: "genfafa", des: "helfaflo" },
    ],
  },
  suggestion: {
    heading: "suggesstion",
    intro: [
      { title: "suggestion title 1", des: "fajfaififjaf" },
      { title: "genfafa", des: "helfaflo" },
    ],
  },
  Recommendation: {
    heading: "Recommendations",
    intro: [
      { title: "Introduction", des: "ans" },
      { title: "Generative Modeling review", des: "Variation" },
      { title: "Variational Autoencoders", des: "asba" },
    ],
  },
  Booking: {
    heading: "Booking",
    intro: [
      { title: "Introduction", des: "ans" },
      { title: "Generative Modeling review", des: "Variation" },
      { title: "Variational Autoencoders", des: "asba" },
    ],
  },
  TermsCondition: {
    heading: "Terms & Condition",
    intro: [
      { title: "Introduction", des: "ans" },
      { title: "Generative Modeling review", des: "Variation" },
      { title: "Variational Autoencoders", des: "asba" },
    ],
  },
};

export const Help_Card = [
  {
    icon: GiTakeMyMoney,
    name: "Payments",
    description: "Cum doctus civibus efficiantur in imperdiet deterruisset.",
  },
  {
    icon: AiOutlineUsergroupAdd,
    name: "Account",
    description: "Cum doctus civibus efficiantur in imperdiet deterruisset.",
  },
  {
    icon: SlSupport,
    name: "General Help",
    description: "Cum doctus civibus efficiantur in imperdiet deterruisset.",
  },
  {
    icon: AiOutlineGlobal,
    name: "International",
    description: "Cum doctus civibus efficiantur in imperdiet deterruisset.",
  },
  {
    icon: MdOutlineFreeCancellation,
    name: "Cancellation",
    description: "Cum doctus civibus efficiantur in imperdiet deterruisset.",
  },
  {
    icon: VscPreview,
    name: "Reviews",
    description: "Cum doctus civibus efficiantur in imperdiet deterruisset.",
  },
];
export const Wishlist_Cards = [
  {
    image: "",
    Title: "Arc Triomphe",
    SubTitle:
      "Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
    Price: "$120.98",
    Time: "",
  },
  {
    image: "",
    Title: "Arc Triomphe",
    SubTitle:
      "Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
    Price: "$120.98",
    Time: "",
  },
  {
    image: "",
    Title: "Arc Triomphe",
    SubTitle:
      "Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
    Price: "$120.98",
    Time: "",
  },
];
export const Wishlist_Card2 = [
  {
    Image: "",
    Title: "Need Help ?",
    SubTitle:
      "Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu",
  },
  {
    Image: "",
    Title: "Payments",
    SubTitle:
      "Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu",
  },
  {
    Image: "",
    Title: "Cancel policy",
    SubTitle:
      "Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu",
  },
];
