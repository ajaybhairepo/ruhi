import { NextResponse } from "next/server";
import { createClient, createPublicClient } from "@/lib/supabase/server";
import { generateProductCode, validateProductData } from "@/lib/models/Product";

// GET: Fetch all products (public - uses anon key)
export async function GET(request: Request) {
  try {
    const supabase = await createPublicClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        { success: true, data: product },
        { status: 200 },
      );
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { success: true, data: products || [] },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST: Create a new product (admin - uses service role key)
export async function POST(request: Request) {
  try {
    const supabase = await createClient(); // Uses service role key
    const body = await request.json();

    // Validate product data
    const validationErrors = validateProductData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, message: validationErrors.join(", ") },
        { status: 400 },
      );
    }

    // Generate product code
    const productCode = generateProductCode(body.category);

    // Set price and offer from first variant
    const firstVariant = body.variants?.[0] || { price: 0, offer: 0 };

    const productData = {
      product_code: productCode,
      name: body.name,
      category: body.category,
      description: body.description || "",
      image: body.image,
      image_public_id: "",
      is_liquid: body.isLiquid || false,
      variants: body.variants || [],
      price: firstVariant.price || 0,
      offer: firstVariant.offer || 0,
    };

    const { data: newProduct, error } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Failed to create product",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create product" },
      { status: 400 },
    );
  }
}

// PUT: Update an existing product (admin - uses service role key)
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required for update" },
        { status: 400 },
      );
    }

    const body = await request.json();

    // Check if product exists
    const { data: existingProduct, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (findError || !existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    // Set price and offer from first variant
    const firstVariant = body.variants?.[0] || { price: 0, offer: 0 };

    const updateData = {
      name: body.name,
      category: body.category,
      description: body.description || "",
      image: body.image,
      is_liquid: body.isLiquid || false,
      variants: body.variants || [],
      price: firstVariant.price || 0,
      offer: firstVariant.offer || 0,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { success: true, data: updatedProduct },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("PUT /api/admin/products error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update product" },
      { status: 400 },
    );
  }
}

// DELETE: Delete a product (admin - uses service role key)
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required for deletion" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("DELETE /api/admin/products error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete product" },
      { status: 500 },
    );
  }
}
