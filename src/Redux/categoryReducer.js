import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { addDoc, collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import {db} from "../Firebase";

// function for adding category.
export const addCategory = createAsyncThunk("category/addCategory",async(c)=>{
  try {

    const docRef = await addDoc(collection(db, "category"), {
   category:c,
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
// function for fetching data from the category.
export const fetchCategory = createAsyncThunk("category/fetchCategory",async()=>{
  try {

    const category = await new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(collection(db, "category"), (snapshot) => {
        const data = snapshot.docs.map((doc)=>{
          return {
            ...doc.data(),
            id:doc.id,
          }
        })
        resolve(data);
      });

    });
   return category;
  }catch(e){
    throw new Error(e);
  }

})
// function for deleting category.
export const deleteCategory= createAsyncThunk("category/deleteCategory",async(id)=>{
  try {
    await deleteDoc(doc(db, "category",id));
    return id;
  }catch(e){
    throw new Error(e);
  }

})
// function for editing category.
export const editCategory= createAsyncThunk("category/editCategory",async(c)=>{
  try {
    console.log("two",c);
    const washingtonRef = doc(db, "category", c.id);
    
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
   category:c.category
    });
    return c;
  }catch(e){
    throw new Error(e);
  }

})

const initialState={
category:[],
error:null,
loading:false,
}

const categorySlice= createSlice({
name:"category",
initialState,
extraReducers:(builder)=>{
// buider function for addCategory.
builder.addCase(addCategory.pending,(state,action)=>{
state.loading=true;
state.error=null;
});
builder.addCase(addCategory.fulfilled,(state,action)=>{
    state.loading=false;
    state.error=null;
    state.category=[...state.category,
           action.payload,
    ]
    });
    builder.addCase(addCategory.rejected,(state,action)=>{
        state.loading=false;
        state.error=true;
        });
// builder function for fetch category

builder.addCase(fetchCategory.pending,(state,action)=>{
  state.loading=true;
  state.error=null;
  });
  builder.addCase(fetchCategory.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=null;
      state.category=action.payload;
      });
      builder.addCase(fetchCategory.rejected,(state,action)=>{
          state.loading=false;
          state.error=true;
          });

// function for deleting category

builder.addCase(deleteCategory.pending,(state,action)=>{
  state.loading=true;
  state.error=null;
  });
  builder.addCase(deleteCategory.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=null;
      state.category= state.category.filter((c)=>(
        c.id !== action.payload
      ))
      });
      builder.addCase(deleteCategory.rejected,(state,action)=>{
          state.loading=false;
          state.error=true;
          });

// function for editing category
  builder.addCase(editCategory.pending,(state,action)=>{
  state.loading=true;
  state.error=null;
  });
  builder.addCase(editCategory.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=null;
      state.category=state.category.map((c,i)=>{
       if((c.id === action.payload.id)){
           return{
            ...c,
            category:action.payload.category,
           }
       }
       return c;

      })
      });
   builder.addCase(editCategory.rejected,(state,action)=>{
          state.loading=false;
          state.error=true;
          });


}



})

export const categoryreducer =  categorySlice.reducer;