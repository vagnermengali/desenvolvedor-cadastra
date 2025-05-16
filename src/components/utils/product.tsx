type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    parcelamento: [number, number];
    color: string;
    image: string;
    size: string[];
    date: string;
  };
  onClick: () => void;
};

export const Product = ({ product, onClick }: Props) => {
  const [parcelas, valorParcela] = product.parcelamento;

  return (
    <div className="product">
      <img src={product.image} alt={product.name} className="product__image" />
      <h3 className="product__name">{product.name}</h3>
      <p className="product__value">R$ {product.price.toFixed(2)}</p>
      <p className="product__installments">
        em até {parcelas}x de R$ {valorParcela.toFixed(2)}
      </p>
      <button className="product__button" onClick={onClick}>
        Comprar
      </button>
    </div>
  );
};
