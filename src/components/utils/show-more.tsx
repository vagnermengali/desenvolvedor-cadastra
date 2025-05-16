type ShowMoreProps = {
  isExpanded: boolean;
  onClick: () => void;
};

export const ShowMore = ({ isExpanded, onClick }: ShowMoreProps) => (
  <button onClick={onClick} className="category__show-more-button">
    {isExpanded ? "CARREGAR MENOS" : "CARREGAR MAIS"}
  </button>
);
