import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { db } from "../Firebase";
import { addDoc,collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase";
export const addProduct = createAsyncThunk("product/addProduct",async(p)=>{
    try {
        // firebase storage method for uploading photos
const storageRef = ref(storage, `images ${Date.now()}`);

// 'file' comes from the Blob or File API
uploadBytes(storageRef, p.photo).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
        const docRef = await addDoc(collection(db, "product"), {
        name:p.name,
        description:p.description,
        price:p.price,
        categoriesName:p.categoriesName,
        quantity:p.quantity,
        shipping:p.shipping,
        photo:p.photo,
          });
           const category = {
            category:c,
            id:docRef.id,
           }
           console.log("check",c);
           return category;
      }catch(e){
        throw new Error(e);
      }
})


const initialState={
    product:[],
    error:null,
    loading:false,
    }

const productSlice = createSlice({
    name:"product",
    initialState,
    extraReducers:(builder)=>{
// buider function for addproduct.
builder.addCase(addProduct.pending,(state,action)=>{
    state.loading=true;
    state.error=null;
    });
    builder.addCase(addProduct.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.product=[...state.product,
               action.payload,
        ]
        });
        builder.addCase(addProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=true;
            });
    }
})

export const productreducer = productSlice.reducer;