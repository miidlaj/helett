import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  slug: string;
}

interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return <div className="mt-2 p-2 bg-white shadow rounded">Loading...</div>;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 p-2 bg-white shadow rounded max-h-60 overflow-y-auto">
      <ul>
        {results.map((product) => (
          <Link key={product.id} href={`/drivers/download/${product.slug}`}>
            <li className="py-2 border-b last:border-b-0">{product.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
