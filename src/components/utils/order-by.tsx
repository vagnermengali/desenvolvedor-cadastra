import React, { useState, useRef, useEffect } from "react";
import { Icons } from "./icons";

export type OrderByProps = {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

const OPTIONS = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
];

export const OrderBy = ({ sortOption, setSortOption }: OrderByProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSortOption(value);
    setOpen(false);
  };

  const selectedLabel =
    OPTIONS.find((opt) => opt.value === sortOption)?.label || "Ordenar por";

  return (
    <div className="order-by" ref={dropdownRef}>
      <div
        className="order-by__selected"
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        <span>{selectedLabel}</span>
        <span aria-hidden="true" className={`order-by__arrow ${open ? "-open" : ""}`}>
          <Icons.arrow />
        </span>
      </div>

      {open && (
        <ul className="order-by__options" role="listbox" tabIndex={-1}>
          {OPTIONS.map(({ value, label }) => (
            <li
              key={value}
              role="option"
              aria-selected={sortOption === value}
              tabIndex={0}
              className={
                sortOption === value
                  ? "order-by__option-selected"
                  : "order-by__option"
              }
              onClick={() => handleSelect(value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(value);
                }
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
