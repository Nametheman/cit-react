import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalUi",
  initialState: {
    isApproveModal: false,
    approveSuccesModal: false,
    isDeclineModal: false,
    declineReasonModal: false,
    declineSuccessModal: false,
    showRjectionReasonModal: false,
    clientDocModal: false,
    clientImage: null,
  },
  reducers: {
    toggleIsApproveModal(state) {
      state.isApproveModal = !state.isApproveModal;
    },
    toggleApproveSuccessModal(state) {
      state.approveSuccesModal = !state.approveSuccesModal;
    },
    toggleIsDeclineModal(state) {
      state.isDeclineModal = !state.isDeclineModal;
    },
    toggleDeclineReasonModal(state) {
      state.declineReasonModal = !state.declineReasonModal;
    },
    toggleDeclineSuccessModal(state) {
      state.declineSuccessModal = !state.declineSuccessModal;
    },
    toggleShowRejectionReasonModal(state) {
      state.showRjectionReasonModal = !state.showRjectionReasonModal;
    },
    toggleClientDocModal(state, payload) {
      state.clientDocModal = !state.clientDocModal;
      state.clientImage = payload;
      console.log(payload);
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
