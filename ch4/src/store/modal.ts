import {create} from "zustand";
import {Post} from "@/model/Post";

interface ModalState { //type
  mode: 'new' | 'comment',
  data: Post | null, //mode가 comment도 data 가 post라면 현재 게시글에 답글을 달고 있구나.
  setMode(mode: 'new' | 'comment'): void;
  setData(data: Post): void;
  reset(): void;
}

export const useModalStore = create<ModalState>((set) => ({ //set, 객체 리턴 함수
  mode: 'new',
  data: null, // 초기값 지정
  setMode(mode) {
    set({ mode });
  },
  setData(data) {
    set({ data });
  },
  reset() { // 리셋 함수
    set({
      mode: 'new',
      data: null,
    })
  }
}));
//zustand도 불변성을 지키기위해서 직접적으로 값 변경x set으로만 mode를 바꿔줄 수 있음.