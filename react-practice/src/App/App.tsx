import { useState } from "react";
import "./App.css";

interface ProductCategoryProps {
  category: string;
}

function ProductCategoryRow({ category }: ProductCategoryProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

interface ProductRowProps {
  product: Product;
}

interface Product {
  category: string;
  name: string;
  price: string;
  stocked: boolean;
}

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

interface ProductTableProps {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let previousCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== previousCategory) {
      rows.push(
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />
      );
    }
    rows.push(<ProductRow key={product.name} product={product} />);
    previousCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        />
        {" Only show products in stock"}
      </label>
    </form>
  );
}

interface FilterableProductTableProps {
  products: Product[];
}

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
