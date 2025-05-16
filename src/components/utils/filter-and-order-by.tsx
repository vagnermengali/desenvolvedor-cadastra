import { useState } from "react";
import { Sidebar } from "./sidebar";

export const FilterAndOrderBy = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <>
      <div className="filter-and-order-by">
        <button
          className="filter-and-order-by__button"
          onClick={() => setIsFilterOpen(true)}
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
        <p>Conteúdo do filtro</p>
      </Sidebar>
      <Sidebar
        title="ORDENAR"
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
      >
        <p>Conteúdo da ordenação</p>
      </Sidebar>
    </>
  );
};
