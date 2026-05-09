import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import type { Product } from "../types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/${id}`);
        setProduct(res.data);
      } catch {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 bg-gray-100 rounded-2xl" />
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-20 bg-gray-100 rounded" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 font-medium">{error ?? "Product not found."}</p>
        <Link to="/" className="text-indigo-600 hover:underline text-sm">
          Back to products
        </Link>
      </div>
    );
  }

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const stars = Math.round(product.rating);
  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Images */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-80 flex items-center justify-center p-6">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-colors ${
                      selectedImage === i
                        ? "border-indigo-500"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">
              {product.category}
            </span>

            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < stars ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.toFixed(1)} · {product.reviews.length} reviews
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-bold text-gray-900">${discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <span
              className={`self-start text-xs font-medium px-3 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.availabilityStatus} {product.stock > 0 && `· ${product.stock} left`}
            </span>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 bg-gray-100 rounded-xl p-4 mt-2">
              <span><span className="font-medium text-gray-700">Brand</span>: {product.brand}</span>
              <span><span className="font-medium text-gray-700">SKU</span>: {product.sku}</span>
              <span><span className="font-medium text-gray-700">Weight</span>: {product.weight}g</span>
              <span><span className="font-medium text-gray-700">Min. Order</span>: {product.minimumOrderQuantity}</span>
              <span className="col-span-2"><span className="font-medium text-gray-700">Shipping</span>: {product.shippingInformation}</span>
              <span className="col-span-2"><span className="font-medium text-gray-700">Warranty</span>: {product.warrantyInformation}</span>
              <span className="col-span-2"><span className="font-medium text-gray-700">Returns</span>: {product.returnPolicy}</span>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{review.reviewerName}</span>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j}>{j < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{review.comment}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
