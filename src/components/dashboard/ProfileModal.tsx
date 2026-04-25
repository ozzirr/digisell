"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, Smile, ArrowRight, Loader2 } from "lucide-react";
import { updateProfileAction } from "@/app/auth/actions";
import { Customer } from "@/lib/db/types";

type ProfileModalProps = {
  customer: Customer;
};

export function ProfileModal({ customer }: ProfileModalProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState(customer.name || "");
  const [gender, setGender] = useState<"m" | "f" | "other" | "">(customer.gender || "");
  const [age, setAge] = useState<string>(customer.age ? customer.age.toString() : "");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !gender || !age) return;

    setStatus("loading");
    const result = await updateProfileAction(customer.id, {
      name,
      gender: gender as "m" | "f" | "other",
      age: parseInt(age),
    });

    if (result.success) {
      router.refresh();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211b17]/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-[0_40px_120px_rgba(33,27,23,0.3)]">
        <div className="bg-[#211b17] p-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Smile className="h-8 w-8 text-[#e8d6cd]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">Benvenuto/a su You First</h2>
          <p className="mt-3 text-white/70">
            Per offrirti un'esperienza davvero su misura, abbiamo bisogno di conoscerti meglio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#7a6c60]">
                Come vuoi essere chiamato/a?
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#cbbbab]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Il tuo nome"
                  required
                  className="w-full rounded-2xl border-0 bg-[#f8f2e8] py-4 pl-12 pr-4 text-base font-semibold text-[#211b17] outline-none ring-1 ring-[#e6ded2] transition focus:ring-2 focus:ring-[#b96f62]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#7a6c60]">
                Genere
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "f", label: "Femminile" },
                  { id: "m", label: "Maschile" },
                  { id: "other", label: "Altro" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGender(opt.id as any)}
                    className={`rounded-2xl py-3 text-sm font-bold transition ${
                      gender === opt.id
                        ? "bg-[#211b17] text-white"
                        : "bg-[#f8f2e8] text-[#7a6c60] hover:bg-[#e6ded2]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#7a6c60]">
                Quanti anni hai?
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#cbbbab]" />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="La tua età"
                  required
                  min="1"
                  max="120"
                  className="w-full rounded-2xl border-0 bg-[#f8f2e8] py-4 pl-12 pr-4 text-base font-semibold text-[#211b17] outline-none ring-1 ring-[#e6ded2] transition focus:ring-2 focus:ring-[#b96f62]"
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-[#7a6c60]">
                La usiamo per personalizzare i consigli alla fine dei workbook.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || !name || !gender || !age}
            className="mt-10 flex w-full min-h-14 items-center justify-center gap-2 rounded-full bg-[#211b17] px-6 py-4 text-base font-black !text-white shadow-xl transition hover:opacity-92 disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>Completa profilo</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          {status === "error" && (
            <p className="mt-4 text-center text-sm font-bold text-red-500">
              Ops! Qualcosa è andato storto. Riprova.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
