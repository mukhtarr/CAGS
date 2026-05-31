import { configureStore, createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    platformName: 'EduOBE',
    version: 'foundation',
  },
  reducers: {},
})

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
})

export default store
