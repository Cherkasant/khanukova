import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SlotInfo } from 'react-big-calendar';

interface SlotReducerState {
  selectedSlot: SlotInfo | null;
}

const initialState: SlotReducerState = {
  selectedSlot: null
};

const slotSlice = createSlice({
  name: 'slotReducer',
  initialState,
  reducers: {
    setSelectedSlot: (state, action: PayloadAction<SlotInfo | null>) => {
      state.selectedSlot = action.payload;
    }
  }
});

export const { setSelectedSlot } = slotSlice.actions;
export default slotSlice.reducer;
