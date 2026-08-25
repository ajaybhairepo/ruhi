"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiPackage,
  FiGrid,
  FiList,
  FiSearch,
  FiX,
  FiUpload,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { categories } from "@/app/data/store";

type Variant = {
  label: string;
  price: number;
  offer: number;
};

type Product = {
  id: string;
  productCode: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imagePublicId?: string;
  isLiquid: boolean;
  variants: Variant[];
  price: number;
  offer: number;
  createdAt: string;
  updatedAt: string;
};

type ProductFormData = {
  id?: string;
  productCode?: string;
  name: string;
  category: string;
  description: string;
  image: string;
  isLiquid: boolean;
  variants: Variant[];
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "Detergent",
    description: "",
    image: "",
    isLiquid: false,
    variants: [
      { label: "500ml", price: 0, offer: 0 },
      { label: "750ml", price: 0, offer: 0 },
      { label: "1000ml", price: 0, offer: 0 },
    ],
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      fetchProducts();
    }
    setIsLoading(false);
  }, [router]);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (data.success) {
        const mappedProducts = data.data.map((p: any) => ({
          id: p.id,
          productCode: p.product_code || "",
          name: p.name,
          category: p.category,
          description: p.description || "",
          image: p.image,
          imagePublicId: p.image_public_id || "",
          isLiquid: p.is_liquid || false,
          variants: p.variants || [],
          price: p.price || 0,
          offer: p.offer || 0,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }));
        setProductsList(mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Generate variant labels based on isLiquid
  const getVariantLabels = (isLiquid: boolean): string[] => {
    if (isLiquid) {
      return ["250ml", "500ml", "750ml", "1000ml"];
    } else {
      return ["1kg", "2kg", "5kg", "10kg"];
    }
  };

  // Update variants when isLiquid changes
  useEffect(() => {
    const labels = getVariantLabels(formData.isLiquid);
    setFormData((prev) => ({
      ...prev,
      variants: labels.map((label) => ({
        label,
        price: 0,
        offer: 0,
      })),
    }));
  }, [formData.isLiquid]);

  const applyOfferPercentage = () => {
    if (offerPercentage > 0) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((variant) => ({
          ...variant,
          offer: Math.round(variant.price * (1 - offerPercentage / 100)),
        })),
      }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    document.cookie =
      "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "isLiquid") {
      setFormData((prev) => ({ ...prev, isLiquid: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string,
  ) => {
    const numericValue = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, [field]: numericValue } : v,
      ),
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setOfferPercentage(0);
    setSaveError(null);
    setSaveSuccess(false);
    const labels = getVariantLabels(false);
    setFormData({
      name: "",
      category: "Detergent",
      description: "",
      image: "",
      isLiquid: false,
      variants: labels.map((label) => ({ label, price: 0, offer: 0 })),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setOfferPercentage(0);
    setSaveError(null);
    setSaveSuccess(false);
    const isLiquid = product.isLiquid || false;
    const labels = getVariantLabels(isLiquid);

    const existingVariants = product.variants || [];
    const variants = labels.map((label) => {
      const existing = existingVariants.find((v) => v.label === label);
      return existing || { label, price: 0, offer: 0 };
    });

    setFormData({
      id: product.id,
      productCode: product.productCode || "",
      name: product.name,
      category: product.category,
      description: product.description || "",
      image: product.image,
      isLiquid: isLiquid,
      variants: variants,
    });
    setIsModalOpen(true);
  };

  // FIXED: handleSaveProduct with proper ID handling
  const handleSaveProduct = async () => {
    if (!formData.name || !formData.category || !formData.image) {
      setSaveError("Please fill in all required fields");
      return;
    }

    const hasAllPrices = formData.variants.every((v) => v.price > 0);
    if (!hasAllPrices) {
      setSaveError("Please enter price for all variants");
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      let url = "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";
      const body: any = { ...formData };

      // For PUT requests, add id as query parameter
      if (editingProduct && formData.id) {
        url = `/api/admin/products?id=${formData.id}`;
        delete body.id; // Remove id from body for PUT
        delete body.productCode; // Remove productCode from body for PUT
      }

      // For POST requests, remove id
      if (method === "POST") {
        delete body.id;
      }

      console.log("Sending request:", { method, url, body }); // Debug log

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        setSaveSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSaveSuccess(false);
        }, 1500);
      } else {
        setSaveError(data.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setSaveError("Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteModal = (productId: string) => {
    setDeletingProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (deletingProductId) {
      try {
        const response = await fetch(
          `/api/admin/products?id=${deletingProductId}`,
          { method: "DELETE" },
        );
        const data = await response.json();
        if (data.success) {
          await fetchProducts();
          setIsDeleteModalOpen(false);
          setDeletingProductId(null);
        } else {
          alert(data.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const filteredProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-ink/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <SiteHeader cartCount={0} onCartOpen={() => {}} />

      <main className="min-h-screen bg-cream px-[5%] py-24 md:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-deep md:text-3xl">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted">
                Manage your products, variants, and inventory
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openAddModal}
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-orange px-4 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiPlus className="h-5 w-5" />
                  Add Product
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
              <button
                onClick={handleLogout}
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiLogOut className="h-5 w-5" />
                  Logout
                </span>
                <span className="absolute inset-0 -translate-x-full bg-red-500/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-8">
            <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange/10 p-3">
                  <FiPackage className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <p className="text-sm text-muted">Total Products</p>
                  <p className="text-2xl font-bold text-deep">
                    {productsList.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <FiGrid className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted">Categories</p>
                  <p className="text-2xl font-bold text-deep">
                    {categories.length - 1}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/10 p-3">
                  <FiList className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted">Total Variants</p>
                  <p className="text-2xl font-bold text-deep">
                    {productsList.reduce(
                      (acc, p) => acc + (p.variants?.length || 0),
                      0,
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <FiGrid className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted">Liquid Products</p>
                  <p className="text-2xl font-bold text-deep">
                    {productsList.filter((p) => p.isLiquid).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
              />
            </div>
            <span className="text-sm text-muted">
              {filteredProducts.length} products found
            </span>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-cream/50">
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Variants
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Price Range
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-deep">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-line/50 hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-cream px-2 py-1 rounded">
                        {product.productCode || `PRD-${product.id}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-deep">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.isLiquid
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {product.isLiquid ? "Liquid" : "Solid"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {product.variants?.map((v) => (
                          <span
                            key={v.label}
                            className="rounded-full bg-cream px-2 py-0.5 text-[10px] text-muted"
                          >
                            {v.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-deep">
                      NPR{" "}
                      {Math.min(
                        ...(product.variants?.map((v) => v.price) || [0]),
                      )}{" "}
                      - NPR{" "}
                      {Math.max(
                        ...(product.variants?.map((v) => v.price) || [0]),
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="group relative overflow-hidden rounded-lg p-2 text-blue-500 transition-all hover:bg-blue-50"
                          title="Edit"
                        >
                          <span className="relative z-10 flex items-center gap-1">
                            <FiEdit2 className="h-4 w-4" />
                          </span>
                          <span className="absolute inset-0 -translate-x-full bg-blue-500/10 transition-transform duration-500 group-hover:translate-x-0" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(product.id)}
                          className="group relative overflow-hidden rounded-lg p-2 text-red-500 transition-all hover:bg-red-50"
                          title="Delete"
                        >
                          <span className="relative z-10 flex items-center gap-1">
                            <FiTrash2 className="h-4 w-4" />
                          </span>
                          <span className="absolute inset-0 -translate-x-full bg-red-500/10 transition-transform duration-500 group-hover:translate-x-0" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-muted">No products found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-[-0.07em] text-deep">
                  {editingProduct ? "Update Product" : "New Product"}
                </h2>
                {formData.productCode && (
                  <p className="text-xs text-muted mt-1">
                    Code: {formData.productCode}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-cream text-deep transition-all hover:bg-deep hover:text-white"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Success/Error Messages */}
            {saveSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-green-700">
                <FiCheck className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Product {editingProduct ? "updated" : "added"} successfully!
                </span>
              </div>
            )}
            {saveError && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-red-600">
                <FiAlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{saveError}</span>
              </div>
            )}

            <form className="space-y-4">
              {/* Basic Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                    placeholder="Product name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Product Type */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="isLiquid"
                  value={formData.isLiquid ? "true" : "false"}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                >
                  <option value="false">Solid (kg)</option>
                  <option value="true">Liquid (ml)</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                  Product Image <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="h-20 w-20 rounded-lg object-cover border border-line"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: "" }))
                        }
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <label className="cursor-pointer rounded-xl border-2 border-dashed border-line bg-cream/50 px-6 py-4 text-center transition-all hover:border-orange hover:bg-cream">
                    <div className="flex items-center gap-2">
                      <FiUpload className="h-5 w-5 text-muted" />
                      <span className="text-sm text-muted">
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <span className="text-xs text-muted">or paste URL below</span>
                </div>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                  placeholder="Product description..."
                />
              </div>

              {/* Offer Percentage */}
              <div className="rounded-xl bg-orange/5 border border-orange/20 p-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                  Apply Offer Percentage to All Variants
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={offerPercentage}
                    onChange={(e) => setOfferPercentage(Number(e.target.value))}
                    className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                    placeholder="Enter percentage (e.g., 20)"
                  />
                  <button
                    type="button"
                    onClick={applyOfferPercentage}
                    className="group relative overflow-hidden rounded-xl bg-orange px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
                  >
                    <span className="relative z-10">Apply</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Enter a percentage to apply discount to all variant prices
                </p>
              </div>

              {/* Variants */}
              <div>
                <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-deep">
                  Variants / Units <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {formData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-3 items-center rounded-xl border border-line bg-cream/30 p-3"
                    >
                      <div>
                        <label className="block text-xs text-muted">Unit</label>
                        <span className="block text-sm font-medium text-deep mt-1">
                          {variant.label}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs text-muted">
                          Price (NPR) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantChange(index, "price", e.target.value)
                          }
                          className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                          placeholder="Price"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted">
                          Offer Price
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={variant.offer}
                          onChange={(e) =>
                            handleVariantChange(index, "offer", e.target.value)
                          }
                          className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                          placeholder="Offer price"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveProduct}
                disabled={isSaving}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>{editingProduct ? "Update Product" : "Add Product"}</>
                  )}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-deep">Delete Product</h3>
              <p className="mt-2 text-sm text-muted">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 rounded-xl border border-line px-4 py-3 text-sm font-medium text-deep transition-all hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="group relative flex-1 overflow-hidden rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30"
                >
                  <span className="relative z-10">Delete</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter onAdminOpen={() => {}} />
    </div>
  );
}
