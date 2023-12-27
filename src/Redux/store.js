import { configureStore } from "@reduxjs/toolkit";
import {categoryreducer} from "./categoryReducer";
import { productreducer } from "./productReducer";
export const store= configureStore({
    reducer:{categoryreducer,productreducer}
})