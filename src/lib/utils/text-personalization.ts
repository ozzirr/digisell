import { Customer } from "@/lib/db/types";

export function personalizeText(text: string, customer: Customer | null): string {
  if (!text) return "";
  if (!customer) {
    // Fallback: remove placeholders but keep both options if no customer
    return text.replace(/\[(.*?)\|(.*?)\]/g, "$1/$2").replace(/{{name}}/g, "ospite");
  }

  let personalized = text;

  // Replace name
  if (customer.name) {
    personalized = personalized.replace(/{{name}}/g, customer.name);
  } else {
    personalized = personalized.replace(/{{name}}/g, "");
  }

  // Replace gender suffixes [maschile|femminile]
  // Example: "Sei arrivat[o|a]" -> "Sei arrivato" or "Sei arrivata"
  const gender = customer.gender || "m"; // Default to 'm' or keep both? Let's default to 'm' for now if not set
  
  personalized = personalized.replace(/\[(.*?)\|(.*?)\]/g, (_, m, f) => {
    if (gender === "f") return f;
    return m;
  });

  return personalized;
}
