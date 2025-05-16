type FilterProps = {
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Filter = ({
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  selectedPrices,
  setSelectedPrices,
}: FilterProps) => {
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

  return (
    <aside className="filter">
      <div className="filter-group">
        <h4>CORES</h4>
        {colors.map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() =>
                toggleItem(color, selectedColors, setSelectedColors)
              }
            />
            {color}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>TAMANHOS</h4>
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => toggleItem(size, selectedSizes, setSelectedSizes)}
            className={selectedSizes.includes(size) ? "active" : ""}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <h4>FAIXA DE PREÇO</h4>
        {priceRanges.map((range) => (
          <label key={range}>
            <input
              type="checkbox"
              checked={selectedPrices.includes(range)}
              onChange={() =>
                toggleItem(range, selectedPrices, setSelectedPrices)
              }
            />
            {range === "501+"
              ? "a partir de R$500"
              : `de R$${range.split("-")[0]} até R$${range.split("-")[1]}`}
          </label>
        ))}
      </div>
    </aside>
  );
};
