import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("Database connection error:", error);
      return false;
    }

    console.log("✓ Database connection successful");
    return true;
  } catch (err) {
    console.error("Error checking database connection:", err);
    return false;
  }
}
