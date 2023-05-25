import { modalSelector } from "@/store/modal";
import { useRecoilState } from "recoil";

//
export default function useModal() {
  const [isModal, setIsModal] = useRecoilState(modalSelector);

  const onOpenModal = () => {
    setIsModal(() => true);
  };

  const onCloseModal = () => {
    setIsModal(() => false);
  };

  return {
    isModal,
    onOpenModal,
    onCloseModal,
  };
}
