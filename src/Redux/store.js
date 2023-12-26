import { configureStore } from "@reduxjs/toolkit";
import {categoryreducer} from "./categoryReducer";
export const store= configureStore({
    reducer:{categoryreducer}
})