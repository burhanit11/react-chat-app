import { create } from "zustand";
import useUserStore from "./userStore";

const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBLocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;
    console.log(currentUser, ">>>>>>>>");

    console.log(user, chatId, "??????????");
    //   check if current user is Block
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBLocked: false,
      });
    }
    //   check if the receiver is block
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBLocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBLocked: false,
      });
    }
  },
  //   change block to un block
  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBLocked: !state.isReceiverBLocked,
    }));
  },
}));

export default useChatStore;
