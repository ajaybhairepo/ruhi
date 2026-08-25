export interface IVariant {
  label: string;
  price: number;
  offer: number;
}

export interface IProduct {
  id?: string;
  productCode: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imagePublicId?: string;
  isLiquid: boolean;
  variants: IVariant[];
  price: number;
  offer: number;
  createdAt?: string;
  updatedAt?: string;
}

// Helper Functions
export function generateProductCode(category: string): string {
  const prefix = category.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${timestamp}-${random}`;
}

export function validateProductData(data: Partial<IProduct>): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push("Product name is required");
  if (!data.category?.trim()) errors.push("Category is required");
  if (!data.image?.trim()) errors.push("Image URL is required");

  if (!data.variants || data.variants.length === 0) {
    errors.push("At least one variant is required");
  } else {
    data.variants.forEach((variant, index) => {
      if (!variant.label?.trim())
        errors.push(`Variant ${index + 1}: Label is required`);
      if (variant.price <= 0)
        errors.push(`Variant ${index + 1}: Price must be greater than 0`);
      if (variant.offer && variant.offer > variant.price) {
        errors.push(
          `Variant ${index + 1}: Offer price cannot exceed regular price`,
        );
      }
    });
  }

  return errors;
}

export function getDefaultVariants(isLiquid: boolean): IVariant[] {
  if (isLiquid) {
    return [
      { label: "250ml", price: 0, offer: 0 },
      { label: "500ml", price: 0, offer: 0 },
      { label: "750ml", price: 0, offer: 0 },
      { label: "1000ml", price: 0, offer: 0 },
    ];
  }
  return [
    { label: "1kg", price: 0, offer: 0 },
    { label: "2kg", price: 0, offer: 0 },
    { label: "5kg", price: 0, offer: 0 },
    { label: "10kg", price: 0, offer: 0 },
  ];
}
