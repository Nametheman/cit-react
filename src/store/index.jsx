import { configureStore } from "@reduxjs/toolkit"
import modalSlice from "./ui-slice"

const store = configureStore({
    reducer: {
        ui: modalSlice.reducer
    }
})

export default store;