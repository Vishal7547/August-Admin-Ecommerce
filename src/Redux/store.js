import { configureStore } from "@reduxjs/toolkit";
import {categoryreducer} from "./categoryReducer";
import { productreducer } from "./productReducer";
import { homereducer } from "./homeReducer";

export const store= configureStore({
    reducer:{categoryreducer,productreducer,homereducer}
})