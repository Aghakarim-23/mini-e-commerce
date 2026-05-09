import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const stars = Math.round(product.rating);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.availabilityStatus}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">
          {product.category}
        </span>

        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-amber-400 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < stars ? "★" : "☆"}</span>
          ))}
          <span className="text-gray-400 text-xs ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-gray-900">
            ${discountedPrice}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
