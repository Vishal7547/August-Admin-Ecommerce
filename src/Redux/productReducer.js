import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../Firebase";

// function for adding product
export const addProduct = createAsyncThunk("product/addProduct", async (p) => {
  try {
    // firebase storage method for uploading photos
    const imgId = `image${Date.now()}`;
    const storageRef = ref(storage, imgId);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, p.photo).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // get photos url from storage

    const url = await getDownloadURL(storageRef);
    console.log(url);

    const photo = {
      id: imgId,
      url,
    };

    const docRef = await addDoc(collection(db, "product"), {
      name: p.name,
      description: p.description,
      price: p.price,
      categoriesName: p.categoriesName,
      quantity: p.quantity,
      shipping: p.shipping,
      photo,
      actualPrice:p.actualPrice,
      qty:1,
    });
    const product = {
      ...p,
      photo,
      qty:1,
      id: docRef.id,
    };
    return product;
  } catch (e) {
    throw new Error(e);
  }
});

// funtion for fetching data from the product
export const fetchProduct = createAsyncThunk(
  "category/fetchProduct",
  async () => {
    try {
      const product = await new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collection(db, "product"),
          (snapshot) => {
            const data = snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
            resolve(data);
          }
        );
      });
      return product;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// function for deleting product.
export const deleteProduct = createAsyncThunk(
  "category/deleteProduct",
  async (p) => {
    try {
      // Create a reference to the file to delete
      const desertRef = ref(storage, p.photo.id);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
          console.log("file is deleted");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!

          console.log(error);
        });
      await deleteDoc(doc(db, "product", p.id));

      return p.id;
    } catch (e) {
      throw new Error(e);
    }
  }
);

const initialState = {
  product: [],
  error: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    // buider function for addproduct.
    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = [...state.product, action.payload];
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // builder function for fetch category

    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // function for deleting product

    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = state.product.filter((c) => c.id !== action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const productreducer = productSlice.reducer;
