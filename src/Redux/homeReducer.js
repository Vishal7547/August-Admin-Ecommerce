import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { db } from "../Firebase";
import { addDoc,collection,onSnapshot,deleteDoc,doc,setDoc} from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL,deleteObject  } from "firebase/storage";
import { storage } from "../Firebase";

// function for adding image to my hero section.
export const addhero = createAsyncThunk("home/addhero",async(p)=>{
    try {
        // firebase storage method for uploading photos
    const imgId = `image${Date.now()}`;
const storageRef = ref(storage,imgId);

// 'file' comes from the Blob or File API
 await uploadBytes(storageRef, p.photo).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

// get photos url from storage

  const url = await getDownloadURL(storageRef);
  console.log(url);

const photo = {
  id:imgId,
  url,
}
    setDoc(doc(db, "home","jsdfhdsffoidgjdsgoi"), {
        photo,
          },
          { merge: true }
          );
           const home = {
             photo,
             id:"jsdfhdsffoidgjdsgoi",
           }
           return home;
      }catch(e){
        throw new Error(e);
      }
})


// function for adding video to my hero section.
export const addherovideo = createAsyncThunk("home/addherovideo",async(v)=>{
    try {
        // firebase storage method for uploading photos
    const VidId = `video${Date.now()}`;
const storageRef = ref(storage,VidId);

// 'file' comes from the Blob or File API
 await uploadBytes(storageRef, v.Video).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

// get photos url from storage

  const url = await getDownloadURL(storageRef);
  console.log(url);

const video = {
  id:VidId,
  url,
}
       setDoc(doc(db, "home","jsdfhdsffoidgjdsgoi"), {
           video,
          },
          { merge: true }
          );
           const home = {
             video,
             id:"jsdfhdsffoidgjdsgoi",
           }
           console.log("home",home);
           return home;
      }catch(e){
        throw new Error(e);
      }
})

const initialState={
    home:{},
    error:null,
    loading:false,
    }

const homeSlice = createSlice({
    name:"home",
    initialState,
    extraReducers:(builder)=>{
// buider function for HERO IMAGE.
builder.addCase( addhero.pending,(state,action)=>{
    state.loading=true;
    state.error=null;
 });
builder.addCase( addhero.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.home={...state.home,
               ...action.payload,
        }
 });
builder.addCase( addhero.rejected,(state,action)=>{
            state.loading=false;
            state.error=true;
 });


 // buider function for HERO VIDEO.
builder.addCase(addherovideo.pending,(state,action)=>{
    state.loading=true;
    state.error=null;
 });
builder.addCase(addherovideo.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.home={...state.home,
            ...action.payload,
     }
 });
builder.addCase(addherovideo.rejected,(state,action)=>{
            state.loading=false;
            state.error=true;
 });

    }
})

export const homereducer = homeSlice.reducer;









