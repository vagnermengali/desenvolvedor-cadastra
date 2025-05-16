import { Icons } from "./icons";

export const Header = ({ cartCount }: { cartCount: number }) => {
  return (
    <header className="header">
      <div className="header__content">
        <a
          className="header__link"
          href="/"
          title="Cadastra"
          aria-label="Voltar para página inicial"
        >
          <Icons.logo />
        </a>
        <button className="header__minicart">
          <Icons.minicart />
          <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
};
