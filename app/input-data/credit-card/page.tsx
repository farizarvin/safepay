// app/input-data/credit-card/page.tsx (FULL CODE WITH COMPLETE CSV DATA)
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Type definition untuk better type safety
interface FraudDetectionResult {
  model_type: string;
  is_fraud: boolean;
  fraud_probability: number;
  confidence_level: string;
  risk_score: string;
  transaction_amount: number;
  features_used: Record<string, string | number | boolean>;
}

// ✅ COMPLETE DATA DARI CSV - AUTO-POPULATED OPTIONS
const MERCHANT_OPTIONS = [
  "fraud_Rippin, Kub and Mann",
  "fraud_Heller, Gutmann and Zieme",
  "fraud_Lind-Buckridge",
  "fraud_Kutch, Hermiston and Farrell",
  "fraud_Keeling-Crist",
  "fraud_Stroman, Hudson and Erdman",
  "fraud_Rowe-Vandervort",
  "fraud_Corwin-Collins",
  "fraud_Herzog Ltd",
  "fraud_Schoen, Kuphal and Nitzsche",
  "fraud_Rogahn-O'Hara",
  "fraud_Jacobi and Sons",
  "fraud_Zboncak, Parker and O'Hara",
  "fraud_Muller Inc",
  "fraud_Collier-Schoen",
  "fraud_Kilback-Gutmann",
  "fraud_Feeney-Hoppe",
  "fraud_Bogan-Hickle",
  "fraud_Larkin, Ratke and Ziemann",
  "fraud_Bruen, Paucek and Rau",
  "fraud_Windler, Kuhn and Cummings",
  "fraud_Mraz, Bode and Littel",
  "fraud_Klocko Inc",
  "fraud_Goyette LLC",
  "fraud_Gusikowski, Leffler and Shanahan",
  "fraud_Willms-Hessel",
  "fraud_Friesen, Wunsch and Muller",
  "fraud_Schowalter-Brakus",
  "fraud_Koepp-Hickle",
  "fraud_Rutherford, Quitzon and Yundt",
  "fraud_Tromp, Abbott and Ratke",
].sort();

const CATEGORY_OPTIONS = [
  "misc_net",
  "grocery_pos",
  "entertainment",
  "gas_transport",
  "misc_pos",
  "grocery_net",
  "shopping_net",
  "shopping_pos",
  "food_dining",
  "personal_care",
  "health_fitness",
  "travel",
  "kids_pets",
  "home",
].sort();

const CITY_OPTIONS = [
  "Moravian Falls",
  "Orient",
  "Malad City",
  "Boulder",
  "Doe Hill",
  "Dublin",
  "Holcomb",
  "Edinburg",
  "Manor",
  "Clarksville",
  "Clarinda",
  "Shenandoah Junction",
  "Saint Petersburg",
  "Grenada",
  "High Rolls Mountain Park",
  "Harrington Park",
  "Woodbine",
  "Lakewood",
  "Millville",
  "Greenwood",
  "Springfield",
  "Franklin",
  "Georgetown",
  "Madison",
  "Clinton",
  "Washington",
  "Arlington",
  "Fairview",
  "Burlington",
  "Chester",
  "Salem",
  "Auburn",
  "Riverside",
  "Oxford",
  "Plymouth",
  "Ashland",
  "Lebanon",
  "Kingston",
  "Newport",
  "Centerville",
  "Milford",
  "Manchester",
  "Richmond",
  "Jackson",
  "Lincoln",
  "Monroe",
  "Dayton",
  "Troy",
  "Florence",
  "Clifton",
  "Bristol",
  "Camden",
  "Marion",
  "Hamilton",
  "Warren",
  "Princeton",
  "Lexington",
  "Charleston",
  "Columbia",
  "Wilmington",
  "Dover",
  "Milton",
  "Hudson",
  "Lancaster",
  "Shelton",
  "Quincy",
  "Clayton",
  "Concord",
  "Westfield",
  "Bridgeport",
  "Hartford",
  "New Haven",
  "Waterbury",
  "Norwalk",
].sort();

const STATE_OPTIONS = [
  "NC",
  "WA",
  "ID",
  "MT",
  "VA",
  "PA",
  "KS",
  "TN",
  "IA",
  "WV",
  "FL",
  "CA",
  "NM",
  "NJ",
  "OK",
  "IN",
  "MA",
  "TX",
  "WI",
  "MI",
  "WY",
  "HI",
  "NE",
  "OR",
  "LA",
  "DC",
  "KY",
  "NY",
  "MS",
  "UT",
  "AL",
  "AR",
  "MD",
  "ME",
  "AZ",
  "MN",
  "OH",
  "CO",
  "VT",
  "MO",
  "SC",
  "NV",
  "IL",
  "NH",
  "SD",
  "AK",
  "ND",
  "CT",
  "RI",
  "DE",
  "GA",
].sort();

const JOB_OPTIONS = [
  "Psychologist, counselling",
  "Special educational needs teacher",
  "Nature conservation officer",
  "Patent attorney",
  "Dance movement psychotherapist",
  "Transport planner",
  "Arboriculturist",
  "Designer, multimedia",
  "Public affairs consultant",
  "Pathologist",
  "IT trainer",
  "Systems developer",
  "Engineer, land",
  "Systems analyst",
  "Naval architect",
  "Financial controller",
  "Marketing executive",
  "Software engineer",
  "Data scientist",
  "Project manager",
  "Business analyst",
  "Graphic designer",
  "Web developer",
  "Sales manager",
  "Human resources officer",
  "Accountant",
  "Teacher, primary school",
  "Nurse, adult",
  "Police officer",
  "Solicitor",
  "Journalist",
  "Chef",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Mechanic",
  "Pharmacist",
  "Dentist",
  "Veterinarian",
  "Architect",
  "Civil engineer",
  "Mechanical engineer",
  "Chemical engineer",
  "Biomedical engineer",
  "Environmental engineer",
  "Construction manager",
  "Real estate agent",
  "Insurance agent",
  "Bank manager",
  "Investment advisor",
  "Tax advisor",
  "Audit manager",
  "Risk analyst",
  "Credit analyst",
  "Underwriter",
  "Claims adjuster",
  "Actuary",
  "Statistician",
  "Economist",
  "Market researcher",
  "Social worker",
  "Counselor",
  "Therapist",
  "Paramedic",
  "Radiographer",
  "Laboratory technician",
  "Research scientist",
  "University lecturer",
  "Librarian",
  "Museum curator",
  "Artist",
  "Musician",
  "Actor",
  "Writer",
  "Photographer",
  "Film director",
  "Producer",
  "Editor",
  "Translator",
  "Interpreter",
].sort();

export default function CreditCardInputPage() {
  const [formData, setFormData] = useState({
    merchant: "",
    category: "",
    amt: "",
    city: "",
    state: "",
    lat: "",
    long: "",
    city_pop: "",
    job: "",
    merch_lat: "",
    merch_long: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FraudDetectionResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/predict/credit-card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merchant: formData.merchant,
            category: formData.category,
            amt: parseFloat(formData.amt),
            city: formData.city,
            state: formData.state,
            lat: parseFloat(formData.lat),
            long: parseFloat(formData.long),
            city_pop: parseInt(formData.city_pop),
            job: formData.job,
            merch_lat: parseFloat(formData.merch_lat),
            merch_long: parseFloat(formData.merch_long),
          }),
        },
      );

      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <div className="w-full h-[100px] sm:h-[120px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center">
            <Link
              href="/"
              className="mr-4 sm:mr-6 hover:scale-110 transition-transform duration-300"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                <ArrowLeft className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#0E1947] stroke-[3px] sm:stroke-[4px] hover:text-[#FF5F31] transition-colors" />
              </div>
            </Link>
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-[#FF5F31]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              CREDIT CARD CHECK
            </h1>
          </div>
          <Link
            href="/"
            className="hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center cursor-pointer group">
              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-[#373642] tracking-[0.07em] group-hover:text-[#FF5F31] transition-colors"
                style={{ fontFamily: "Protest Guerrilla, cursive" }}
              >
                SafePay.AI
              </h2>
              <div className="w-[20px] h-[4px] sm:w-[25px] sm:h-[5px] lg:w-[30px] lg:h-[6px] ml-2 mt-2 sm:mt-3 bg-gradient-to-r from-[#EE4312] to-[#FF5F31] rounded-full group-hover:w-[25px] sm:group-hover:w-[35px] lg:group-hover:w-[40px] transition-all duration-300" />
            </div>
          </Link>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-300 p-4 rounded-lg">
              <p className="text-red-700 font-medium">
                <strong>❌ Error:</strong> {error}
              </p>
            </div>
          )}

          {/* ✅ 1. MERCHANT - AUTO-POPULATED DROPDOWN */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Merchant (Nama Merchant)
                </label>
                <select
                  value={formData.merchant}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("merchant", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih merchant</option>
                  {MERCHANT_OPTIONS.map((merchant) => (
                    <option key={merchant} value={merchant}>
                      {merchant.replace("fraud_", "")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Pilih merchant dari daftar yang tersedia berdasarkan dataset
                  fraud detection.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* ✅ 2. CATEGORY - AUTO-POPULATED DROPDOWN */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Category (Kategori Transaksi)
                </label>
                <select
                  value={formData.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih kategori</option>
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category.replace(/_/g, " ").toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Pilih kategori transaksi dari daftar yang tersedia dalam
                  dataset.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* ✅ 3. CITY - AUTO-POPULATED DROPDOWN */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  City (Kota)
                </label>
                <select
                  value={formData.city}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("city", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih kota</option>
                  {CITY_OPTIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Pilih kota dari daftar yang tersedia dalam dataset fraud
                  detection.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* ✅ 4. STATE - AUTO-POPULATED DROPDOWN */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  State (Negara Bagian)
                </label>
                <select
                  value={formData.state}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("state", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih state</option>
                  {STATE_OPTIONS.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Pilih kode negara bagian dari daftar yang tersedia.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* ✅ 5. JOB - AUTO-POPULATED DROPDOWN */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Job (Pekerjaan)
                </label>
                <select
                  value={formData.job}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("job", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih pekerjaan</option>
                  {JOB_OPTIONS.map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Pilih jenis pekerjaan dari daftar yang tersedia dalam dataset.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Amount - Input Field */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Amount (Jumlah Transaksi)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Masukkan jumlah transaksi"
                  value={formData.amt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("amt", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Masukkan jumlah transaksi dalam mata uang yang sesuai.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Latitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Latitude (Lintang)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: -6.200000"
                  value={formData.lat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("lat", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat lintang lokasi transaksi.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Longitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Longitude (Bujur)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: 106.816666"
                  value={formData.long}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("long", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat bujur lokasi transaksi.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* City Population */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  City Population (Populasi Kota)
                </label>
                <Input
                  type="number"
                  placeholder="Contoh: 10000000"
                  value={formData.city_pop}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("city_pop", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Jumlah populasi kota tempat transaksi dilakukan.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Merchant Latitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Merchant Latitude (Lintang Merchant)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: -6.175000"
                  value={formData.merch_lat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("merch_lat", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat lintang lokasi merchant.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Merchant Longitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Merchant Longitude (Bujur Merchant)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: 106.865000"
                  value={formData.merch_long}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("merch_long", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat bujur lokasi merchant.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* ✅ SIMPLE RESULTS DISPLAY DENGAN "FRAUD"/"NOT FRAUD" */}
          {result && (
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-lg">
              <div className="text-center space-y-4">
                {/* Status dengan Icon */}
                <div
                  className={`text-6xl ${result.is_fraud ? "animate-pulse" : ""}`}
                >
                  {result.is_fraud ? "🚨" : "✅"}
                </div>

                {/* Status Text */}
                <h2
                  className={`text-2xl font-bold ${
                    result.is_fraud ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {result.is_fraud
                    ? "FRAUDULENT TRANSACTION"
                    : "LEGITIMATE TRANSACTION"}
                </h2>

                {/* FRAUD/NOT FRAUD Text */}
                <div
                  className={`text-3xl font-bold ${
                    result.is_fraud ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {result.is_fraud ? "FRAUD" : "NOT FRAUD"}
                </div>

                {/* Risk Score Badge */}
                <div className="flex justify-center">
                  <span
                    className={`px-8 py-4 rounded-2xl text-xl font-bold shadow-lg ${
                      result.risk_score === "HIGH"
                        ? "bg-red-500 text-white"
                        : result.risk_score === "MEDIUM"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    Risk Score: {result.risk_score}
                  </span>
                </div>

                {/* ✅ Rekomendasi berdasarkan hasil */}
                <div className="mt-6 text-left">
                  <h3 className="text-lg font-semibold text-[#373642] mb-2">
                    Rekomendasi:
                  </h3>
                  {result.is_fraud ? (
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                      <li>
                        Segera blokir kartu kredit untuk mencegah transaksi
                        lanjutan.
                      </li>
                      <li>
                        Laporkan ke pihak bank untuk investigasi lebih lanjut.
                      </li>
                      <li>
                        Periksa riwayat transaksi terakhir Anda secara
                        menyeluruh.
                      </li>
                      <li>Ganti PIN dan kata sandi jika perlu.</li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1 text-green-700">
                      <li>
                        Transaksi Anda aman. Tetap waspada terhadap aktivitas
                        mencurigakan.
                      </li>
                      <li>Gunakan kartu di merchant terpercaya.</li>
                      <li>
                        Aktifkan notifikasi transaksi real-time dari bank Anda.
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-8 sm:pt-12 lg:pt-16">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[45px] sm:h-[50px] bg-gradient-to-r from-[#EE4312] to-[#FF5F31] hover:from-[#FF5F31] hover:to-[#EE4312] rounded-full text-white font-semibold text-base sm:text-lg lg:text-xl tracking-[0.07em] transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Predicting...</span>
                </div>
              ) : (
                "Predict"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
