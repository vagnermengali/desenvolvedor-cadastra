import { ReactNode } from "react";
import { Icons } from "./icons";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export const Sidebar = ({ isOpen, onClose, children, title }: SidebarProps) => {
  return (
    <div className={`sidebar__overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="sidebar">
        <div className="sidebar__header">
          <h2>{title}</h2>
          <button className="sidebar__close-btn" onClick={onClose}>
            <Icons.x/>
          </button>
        </div>
        <div className="sidebar__content">{children}</div>
      </div>
    </div>
  );
};
