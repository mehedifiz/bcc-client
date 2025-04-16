import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client - add these to your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadPdf = async (file) => {
  if (!file || file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }

  try {
    // Create a unique filename
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${file.name.replace(/\s+/g, "_")}`;

    // Upload the file
    const { data, error } = await supabase.storage.from("pdfs").upload(uniqueFileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      console.error("Error uploading PDF:", error);
      throw error;
    }

    // Get public URL
    const { data: publicURLData } = supabase.storage.from("pdfs").getPublicUrl(data.path);

    return publicURLData.publicUrl;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw new Error("Failed to upload PDF");
  }
};