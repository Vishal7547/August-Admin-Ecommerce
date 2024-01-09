import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../Firebase";

// function for adding image to my hero section.
export const addhero = createAsyncThunk("home/addhero", async (p) => {
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
    setDoc(
      doc(db, "home", "jsdfhdsffoidgjdsgoi"),
      {
        photo,
      },
      { merge: true }
    );
    const home = {
      photo,
      id: "jsdfhdsffoidgjdsgoi",
    };
    return home;
  } catch (e) {
    throw new Error(e);
  }
});

// function for adding video to my hero section.
export const addherovideo = createAsyncThunk("home/addherovideo", async (v) => {
  try {
    // firebase storage method for uploading photos
    const VidId = `video${Date.now()}`;
    const storageRef = ref(storage, VidId);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, v.Video).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // get photos url from storage

    const url = await getDownloadURL(storageRef);
    console.log(url);

    const video = {
      id: VidId,
      url,
    };
    setDoc(
      doc(db, "home", "jsdfhdsffoidgjdsgoi"),
      {
        video,
      },
      { merge: true }
    );
    const home = {
      video,
      id: "jsdfhdsffoidgjdsgoi",
    };
    console.log("home", home);
    return home;
  } catch (e) {
    throw new Error(e);
  }
});

// delete photo from storage
export const deletehomeimage = createAsyncThunk(
  "home/deletehomeimage",
  async (p) => {
    console.log(p);
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
    } catch (e) {
      throw new Error(e);
    }
  }
);

// delete photo from storage
export const deletehomeVideo = createAsyncThunk(
  "home/deletehomeVideo",
  async (v) => {
    try {
      // Create a reference to the file to delete
      const desertRef = ref(storage, v.video.id);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
          console.log("previous video is deleted");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!

          console.log(error);
        });
    } catch (e) {
      throw new Error(e);
    }
  }
);

// funtion for fetching data from the home collection
export const fetchHomeCollection = createAsyncThunk(
  "home/fetchHomeCollection",
  async () => {
    try {
      const home = await new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, "home", "jsdfhdsffoidgjdsgoi"),
          (doc) => {
            // console.log({ ...doc.data(), id: doc.id });
            const data = {
              ...doc.data(),
              id: doc.id,
            };
            resolve(data);
          }
        );
      });
      // console.log("/*", home);
      return home;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// function for uploading images of category section for home page
export const addHeroCategory = createAsyncThunk(
  "home/addHeroCategory",
  async (p) => {
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

      const category = {
        imgId,
        url,
        ...p.categoriesName,
      };

      const washingtonRef = doc(db, "home", "jsdfhdsffoidgjdsgoi");
      await updateDoc(washingtonRef, {
        categories: arrayUnion(category),
      });
      const home = {
        category,
        id: "jsdfhdsffoidgjdsgoi",
      };
      return home;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// function for deleting home category images.
export const deleteHomeCategory = createAsyncThunk(
  "home/deleteHomeCategory",
  async (p) => {
    try {
      // Create a reference to the file to delete
      const desertRef = ref(storage, p.imgId);

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
      const washingtonRef = doc(db, "home", "jsdfhdsffoidgjdsgoi");
      await updateDoc(washingtonRef, {
        categories: arrayRemove(p),
      });

      return p.id;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// function for uploading images of Your Every Mood  for home page
export const addYourEveryMood = createAsyncThunk(
  "home/addYourEveryMood",
  async (p) => {
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

      const yourMood = {
        imgId,
        url,
        ...p.categoriesName,
      };

      const washingtonRef = doc(db, "home", "jsdfhdsffoidgjdsgoi");
      await updateDoc(washingtonRef, {
        yourEveryMood: arrayUnion(yourMood),
      });
      const home = {
        yourMood,
        id:"jsdfhdsffoidgjdsgoi",
      };
      return home;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// // function for deleting images of Your Every Mood.
export const deleteYourEveryMood = createAsyncThunk(
  "home/deleteYourEveryMood",
  async (p) => {
    try {
      // Create a reference to the file to delete
      const desertRef = ref(storage, p.imgId);

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
      const washingtonRef = doc(db, "home", "jsdfhdsffoidgjdsgoi");
      await updateDoc(washingtonRef, {
        yourEveryMood: arrayRemove(p),
      });

      return p.id;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// function for adding banner text .
export const addBanner = createAsyncThunk(
  "home/addBanner",
  async (bannerName) => {
    try {
      setDoc(
        doc(db, "home", "jsdfhdsffoidgjdsgoi"),
        {
          bannerName,
        },
        { merge: true }
      );
      const home = {
        bannerName,
        id: "jsdfhdsffoidgjdsgoi",
      };
      return home;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// // function for adding image to Infocus section.
export const addInFocusImage = createAsyncThunk("home/addInFocusImage", async (p) => {
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

    const inFocusPhoto= {
      imgId,
      url,
      category:p.category,
      id:p.id,
    };
    setDoc(
      doc(db, "home", "jsdfhdsffoidgjdsgoi"),
      {
        inFocusPhoto,
      },
      { merge: true }
    );
    const home = {
      inFocusPhoto,
      id: "jsdfhdsffoidgjdsgoi",
    };
    return home;
  } catch (e) {
    throw new Error(e);
  }
});

// delete image of in focus 
export const deletehomeInFocusImage = createAsyncThunk(
  "home/deletehomeInFocusImage",
  async (p) => {
    console.log(p);
    try {
      // Create a reference to the file to delete
      const desertRef = ref(storage, p);

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
    } catch (e) {
      throw new Error(e);
    }
  }
);

// // function for adding video to Infocus section.
export const addInFocusVideo = createAsyncThunk("home/addInFocusVideo", async (p) => {
  try {
    // firebase storage method for uploading photos
    // console.log("ppppppppppppppppp",p);
    const imgId = `image${Date.now()}`;
    const storageRef = ref(storage, imgId);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, p.Video).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // get photos url from storage

    const url = await getDownloadURL(storageRef);
    console.log(url);

    const inFocusVideo= {
      imgId,
      url,
      category:p.category,
      id:p.id,
    };
    setDoc(
      doc(db, "home", "jsdfhdsffoidgjdsgoi"),
      {
        inFocusVideo,
      },
      { merge: true }
    );
    const home = {
      inFocusVideo,
      id: "jsdfhdsffoidgjdsgoi",
    };
    return home;
  } catch (e) {
    throw new Error(e);
  }
});

// delete video of in focus 
export const deletehomeInFocusVideo = createAsyncThunk(
  "home/deletehomeInFocusVideo",
  async (p) => {
    try {
      // Create a reference to the file to delete
      const desertRef = ref(storage,p);

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
    } catch (e) {
      throw new Error(e);
    }
  }
);

const initialState = {
  home: {
    categories: [],
    yourEveryMood:[],
  },
  error: null,
  loading: false,
  categoryLoading: false,
  categoryDelete: false,
  everyMoodLoading: false,
  everyMoodDeleteLoading:false,
  bannerLoading: false,
  inFocusLoader:false,
  inFocusVideoLoader:false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    // buider function for HERO IMAGE.
    builder.addCase(addhero.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addhero.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.home = { ...state.home, ...action.payload };
    });
    builder.addCase(addhero.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // buider function for HERO VIDEO.
    builder.addCase(addherovideo.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addherovideo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.home = { ...state.home, ...action.payload };
    });
    builder.addCase(addherovideo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // builder function for fetch homeCollection

    builder.addCase(fetchHomeCollection.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHomeCollection.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.home = action.payload;
    });
    builder.addCase(fetchHomeCollection.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // builder for home category section
    builder.addCase(addHeroCategory.pending, (state, action) => {
      state.categoryLoading = true;
      state.error = null;
    });
    builder.addCase(addHeroCategory.fulfilled, (state, action) => {
      state.categoryLoading = false;
      state.error = null;
      state.home = {
        ...state.home,
        id: action.payload.id,
        categories: [...state?.home?.categories, action.payload.category],
      };
    });
    builder.addCase(addHeroCategory.rejected, (state, action) => {
      state.categoryLoading = false;
      state.error = true;
    });

    // function for deleting category of home section

    builder.addCase(deleteHomeCategory.pending, (state, action) => {
      state.categoryDelete = true;
      state.error = null;
    });
    builder.addCase(deleteHomeCategory.fulfilled, (state, action) => {
      state.categoryDelete = false;
      state.error = null;
      state.home.categories = state?.home?.categories.filter(
        (c) => c.id !== action.payload
      );
    });
    builder.addCase(deleteHomeCategory.rejected, (state, action) => {
      state.categoryDelete = false;
      state.error = true;
    });

    // builder for home your every mood section
    builder.addCase(addYourEveryMood.pending, (state, action) => {
      state.everyMoodLoading = true;
      state.error = null;
    });
    builder.addCase(addYourEveryMood.fulfilled, (state, action) => {
      state.everyMoodLoading = false;
      state.error = null;
      state.home = {
        ...state.home,
        id: action.payload.id,
        yourEveryMood: [...state?.home?.yourEveryMood, action.payload.yourMood],
      };
    });
    builder.addCase(addYourEveryMood.rejected, (state, action) => {
      state.everyMoodLoading = false;
      state.error = true;
    });

    // function for deleting your every mood section

    builder.addCase(deleteYourEveryMood.pending, (state, action) => {
      state.everyMoodDeleteLoading = true;
      state.error = null;
    });
    builder.addCase(deleteYourEveryMood.fulfilled, (state, action) => {
      state.everyMoodDeleteLoading = false;
      state.error = null;
      state.home.yourEveryMood= state?.home?.yourEveryMood.filter(
        (c) => c.id !== action.payload
      );
    });
    builder.addCase(deleteYourEveryMood.rejected, (state, action) => {
      state.everyMoodDeleteLoading = false;
      state.error = true;
    });

// buider function for banner .
builder.addCase(addBanner.pending, (state, action) => {
  state.bannerLoading = true;
  state.error = null;
});
builder.addCase(addBanner.fulfilled, (state, action) => {
  state.bannerLoading = false;
  state.error = null;
  state.home = { ...state.home, ...action.payload };
});
builder.addCase(addBanner.rejected, (state, action) => {
  state.bannerLoading = false;
  state.error = true;
});

    // buider function for Infocus images.
    builder.addCase(addInFocusImage.pending, (state, action) => {
      state.inFocusLoader = true;
      state.error = null;
    });
    builder.addCase(addInFocusImage.fulfilled, (state, action) => {
      state.inFocusLoader = false;
      state.error = null;
      state.home = { ...state.home, ...action.payload };
    });
    builder.addCase(addInFocusImage.rejected, (state, action) => {
      state.inFocusLoader = false;
      state.error = true;
    });

    // buider function for Infocus Video.
    builder.addCase(addInFocusVideo.pending, (state, action) => {
      state.inFocusVideoLoader = true;
      state.error = null;
    });
    builder.addCase(addInFocusVideo.fulfilled, (state, action) => {
      state.inFocusVideoLoader = false;
      state.error = null;
      state.home = { ...state.home, ...action.payload };
    });
    builder.addCase(addInFocusVideo.rejected, (state, action) => {
      state.inFocusVideoLoader = false;
      state.error = true;
    });


  },
});

export const homereducer = homeSlice.reducer;
