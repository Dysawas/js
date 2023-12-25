import { createPortal } from "react-dom"

interface ModalPropTypes {
  title: string,
  show: Boolean,
  action: (arg1?: any) => void,
  onClose: () => void,
  btnActionText: string,
  children?: JSX.Element
}

export const Modal = ({show, title, btnActionText, action, onClose, children} : ModalPropTypes ) => {
  return (
   show && createPortal( 
   <div className={`flex justify-center items-center fixed inset-0 transition-colors ${show ? "visible bg-black/20" : "invisible"}`} onClick={onClose}>
      <div className={`bg-white w-3/5 p-6	h-3/5 rounded-xl shadow-p6 transition-all ${show ? "scale-100 opacity-100" : "scale-125 opacity-0" }`} onClick={e => e.stopPropagation()}>
        <header className="text-center mb-7">
          <h2 className="font-medium text-2xl mx-2">{title}</h2>
        </header>
        <main className="px-4 ">{children}</main>
        <footer className="absolute right-0 px-6 pb-0 bottom-2">
          <button className="float-right rounded-lg bg-red-500 p-2" onClick={onClose}>Отмена</button>
          <button className="float-right rounded-lg bg-lime-500 p-2  mr-1" onClick={action}>{btnActionText}</button>
        </footer>
      </div>
    </div>
    , document.getElementById("modal") as HTMLElement)
    )

};
