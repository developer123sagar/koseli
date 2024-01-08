import { FoodInputField, IFoodForm } from "@/types";

export const foodInitialFormState: IFoodForm = {
    name: "",
    images: [""],
    keywords: [],
    activeImage: "",
    subTitle:"",
    foodMakingTime: { minutes: null },
    foodCategory: "",
    foodSpeciality: [],
    minQuantity: null,
    price: null,
    addon: [
        {
            isRequired: false,
            name: "",
            extraPrice: null,
            quantity: null,
            extra: "",
            id: "",
            isCheckDefault: false
        }
    ]
}
export const AddCombofield = [
    {
        name: "Name",
        type: "text",
        formName: "name",
    },
    {
        name: "Amount",
        type: "number",
        formName: "amount",
    },

]

export const foodInputField: FoodInputField[] = [
    {
        name: "Food Name",
        type: "text",
        formName: "name",
    },
    {
        name: "Food Price",
        type: "number",
        formName: "price",
    },
    {
        name: "Minimum Quantity To Checkout",
        type: "number",
        formName: "minQuantity",
    },
];
