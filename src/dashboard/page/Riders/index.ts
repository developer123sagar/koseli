import { IRiderForm, IRiderForm2 } from "@/types";
export type BooleanButton = {
    label: string;
    toggleName: string;
}

export const FormState: IRiderForm = {
    email: "",
    gender: "male",
    fatherName: "",
    grandFatherName: "",
    photo: "",
    motherName: "",
    name: "",
    phone: "",
    confirmPassword: "",
    password: "",
    dob: new Date(),
    bloodGroup: "A+",
    blueBook: {
        backImage: "",
        blueBookNumber: "",
        expireDate: new Date(),
        frontImage: "",
        issuedDate: new Date(),
        middleImage: "",
    },
    citizenship: {
        backImage: "",
        citizenshipNo: "",
        frontImage: "",
        issuedDate: new Date(),
        issuedPlace: "",
    },
    contractDoc: "",
    currentAddress: {
        city: "",
        state: "",
        street: "",
        zipCode: null
    },
    permanentAddress: {
        city: "",
        state: "",
        street: "",
        zipCode: null
    },
    Desh: "Nepal",
    insurance: {
        description: "",
        expireDate: new Date(),
        insuranceNumber: "",
        issuedDate: new Date(),
        issuedVendor: "",
        document: "",
    },
    license: {
        backImage: "",
        frontImage: "",
        expireDate: new Date(),
        issuedDate: new Date(),
        issuedPlace: "",
        licenseNo: "",
    },
    secondaryPhone: "",
    vehicle: {
        color: "",
        image: "",
        issuedDate: new Date(),
        issuedPlace: "",
        model: "",
        vehicleNumber: "",
        vehicleType: "Bike"
    }
};

export const FormState2: IRiderForm2 = {
    email: "",
    gender: "male",
    image: [""],
    bloodGroup: "",
    bluebookNumber: "",
    fatherName: "",
    grandFatherName: "",
    insuranceNumber: "",
    licenseNumber: "",
    photo: "",
    motherName: "",
    name: "",
    phone: "",
    vehicleNumber: "",
    confirmPassword: "",
    password: "",
    citizenNumber: "",
    dob: new Date(),
};


export const Promotion = [
    {
        name: "image",
        type: "text",
        placeH: "Image",
        formName: "name"
    }
]
export const TaxField = [
    {
        name: "Name",
        type: "text",
        placeH: "koseli",
        formName: "name"
    },
    {
        name: "Tax",
        type: "number",
        placeH: "10",
        formName: "tax"
    },
    {
        name: "desh",
        type: "text",
        placeH: "Desh",
        formName: "desh"
    },

]

export const RiderField = [
    {
        name: "Rider Name",
        type: "text",
        placeH: "Name",
        formName: "name",
    },
    {
        name: "Email",
        type: "email",
        placeH: "Abc@gmail.com",
        formName: "email",
    },
    {
        name: "Father Name",
        type: "text",
        placeH: "father name",
        formName: "fatherName",
    },
    {
        name: "Mother Name",
        type: "text",
        placeH: "mother name",
        formName: "motherName",
    },
    {
        name: "GrandFather Name ",
        type: "text",
        placeH: "Grandfather name",
        formName: "grandFatherName",
    },
    {
        name: "Password",
        type: "password",
        placeH: "Enter your password",
        formName: "password",
    },
    {
        name: "Confirm Password",
        type: "password",
        placeH: "confirm your password",
        formName: "confirmPassword",
    },
    {
        name: "Phone number",
        type: "text",
        placeH: "980000000",
        formName: "phone",
    },
    {
        name: "Vehicle number",
        type: "text",
        placeH: "Ba-1023-3333",
        formName: "vehicleNumber",
    },
    {
        name: "License number",
        type: "text",
        placeH: "20000302",
        formName: "licenseNumber",
    },
    {
        name: "Citizenship number",
        type: "text",
        placeH: "Ra-100-2065",
        formName: "citizenNumber",
    },
    {
        name: "Bluebook number",
        type: "text",
        placeH: "808080",
        formName: "bluebookNumber",
    },
    {
        name: "Insurance number",
        type: "text",
        placeH: "10000000",
        formName: "insuranceNumber",
    },
    {
        name: "Bloood Group",
        type: "text",
        placeH: "B+",
        formName: "bloodGroup",
    },
];
