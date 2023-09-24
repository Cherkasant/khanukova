import { RootState } from '../store';

export default {
  getSelectedSlot: (state: RootState) => state.slotReducer.selectedSlot
};
