import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD0UeOUiAm5oKXRFN7PLj7CtCdwkCuDRTc",
    authDomain: "koseli-foods.firebaseapp.com",
    projectId: "koseli-foods",
    storageBucket: "koseli-foods.appspot.com",
    messagingSenderId: "642783076989",
    appId: "1:642783076989:web:88a579c04404bd4e724714",
    measurementId: "G-08QG9CWJHR"
};

export const app = initializeApp(firebaseConfig);