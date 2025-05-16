import { Icons } from "./icons";
import { Sidebar } from "./sidebar";
import React, { useState } from "react";

export type FilterAndOrderByProps = {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
};

const OPTIONS = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
];

export const FilterAndOrderBy = ({
  sortOption,
  setSortOption,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  selectedPrices,
  setSelectedPrices,
}: FilterAndOrderByProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const colors = [
    "Amarelo",
    "Azul",
    "Branco",
    "Cinza",
    "Laranja",
    "Verde",
    "Vermelho",
    "Preto",
    "Rosa",
    "Vinho",
  ];
  const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40"];
  const priceRanges = ["0-50", "51-150", "151-300", "301-500", "501+"];

  const [tempColors, setTempColors] = useState<string[]>([...selectedColors]);
  const [tempSizes, setTempSizes] = useState<string[]>([...selectedSizes]);
  const [tempPrices, setTempPrices] = useState<string[]>([...selectedPrices]);

  const [openGroups, setOpenGroups] = useState({
    cores: true,
    tamanhos: true,
    precos: true,
  });

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleItem = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item]
    );
  };

  const applyFilters = () => {
    setSelectedColors(tempColors);
    setSelectedSizes(tempSizes);
    setSelectedPrices(tempPrices);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setTempColors([]);
    setTempSizes([]);
    setTempPrices([]);
  };

  const handleSelect = (value: string) => {
    setSortOption(value);
    setIsOrderOpen(false);
  };

  return (
    <>
      <div className="filter-and-order-by">
        <button
          className="filter-and-order-by__button"
          onClick={() => {
            setTempColors([...selectedColors]);
            setTempSizes([...selectedSizes]);
            setTempPrices([...selectedPrices]);
            setIsFilterOpen(true);
          }}
        >
          Filtrar
        </button>
        <button
          className="filter-and-order-by__button"
          onClick={() => setIsOrderOpen(true)}
        >
          Ordenar
        </button>
      </div>
      <Sidebar
        title="FILTRAR"
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <div className="filter">
          <div className="filter__group">
            <div
              className="filter__group-header"
              onClick={() => toggleGroup("cores")}
            >
              <h4>CORES</h4>
              <Icons.arrow
                className={`${openGroups.cores ? "open" : "close"}`}
              />
            </div>
            {openGroups.cores && (
              <div className="filter__group-content">
                {colors.map((color) => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      checked={tempColors.includes(color)}
                      onChange={() =>
                        toggleItem(color, tempColors, setTempColors)
                      }
                    />
                    {color}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="filter__group">
            <div
              className="filter__group-header"
              onClick={() => toggleGroup("tamanhos")}
            >
              <h4>TAMANHOS</h4>
              <Icons.arrow
                className={`${openGroups.tamanhos ? "open" : "close"}`}
              />
            </div>
            {openGroups.tamanhos && (
              <div className="filter__row">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleItem(size, tempSizes, setTempSizes)}
                    className={tempSizes.includes(size) ? "active" : ""}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="filter__group">
            <div
              className="filter__group-header"
              onClick={() => toggleGroup("precos")}
            >
              <h4>FAIXA DE PREÇO</h4>
              <Icons.arrow
                className={`${openGroups.precos ? "open" : "close"}`}
              />
            </div>
            {openGroups.precos && (
              <>
                {" "}
                <div className="filter__group-content">
                  {priceRanges.map((range) => (
                    <label key={range}>
                      <input
                        type="checkbox"
                        checked={tempPrices.includes(range)}
                        onChange={() =>
                          toggleItem(range, tempPrices, setTempPrices)
                        }
                      />
                      {range === "501+"
                        ? "a partir de R$500"
                        : `de R$${range.split("-")[0]} até R$${
                            range.split("-")[1]
                          }`}
                    </label>
                  ))}
                </div>
                <div className="filter__buttons">
                  <button
                    onClick={applyFilters}
                    className="filter__apply-button"
                  >
                    Aplicar
                  </button>
                  <button
                    onClick={clearFilters}
                    className="filter__clear-button"
                  >
                    Limpar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Sidebar>
      <Sidebar
        title="ORDENAR"
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
      >
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
      </Sidebar>
    </>
  );
};
