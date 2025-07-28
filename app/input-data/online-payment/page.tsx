// app/input-data/online-payment/page.tsx (FULL CODE WITH SIMPLE RESULTS)
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

export default function OnlinePaymentInputPage() {
  const [formData, setFormData] = useState({
    step: "",
    type: "",
    amount: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    oldbalanceDest: "",
    newbalanceDest: "",
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
      const requestData = {
        step: parseInt(formData.step),
        type: formData.type,
        amount: parseFloat(formData.amount),
        oldbalanceOrg: parseFloat(formData.oldbalanceOrg),
        newbalanceOrig: parseFloat(formData.newbalanceOrig),
        oldbalanceDest: parseFloat(formData.oldbalanceDest),
        newbalanceDest: parseFloat(formData.newbalanceDest),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/predict/online-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (!response.ok) {
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
              ONLINE PAYMENT CHECK
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

          {/* Step */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Step (Langkah Transaksi)
                </label>
                <Input
                  type="number"
                  placeholder="Contoh: 1, 2, 3..."
                  value={formData.step}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("step", e.target.value)
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
                  Nomor urut atau langkah dalam serangkaian transaksi. Membantu
                  mengidentifikasi pola transaksi berurutan yang mencurigakan.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Type */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Type (Jenis Transaksi)
                </label>
                <select
                  value={formData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("type", e.target.value)
                  }
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih jenis transaksi</option>
                  <option value="PAYMENT">PAYMENT</option>
                  <option value="TRANSFER">TRANSFER</option>
                  <option value="CASH_OUT">CASH_OUT</option>
                  <option value="CASH_IN">CASH_IN</option>
                  <option value="DEBIT">DEBIT</option>
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Jenis transaksi yang dilakukan. Setiap jenis memiliki pola dan
                  risiko penipuan yang berbeda-beda.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Amount */}
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
                  value={formData.amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("amount", e.target.value)
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
                  Jumlah uang yang ditransaksikan. Nilai yang tidak biasa atau
                  terlalu besar dapat mengindikasikan aktivitas penipuan.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Old Balance Origin */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Old Balance Origin (Saldo Awal Pengirim)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo sebelum transaksi"
                  value={formData.oldbalanceOrg}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("oldbalanceOrg", e.target.value)
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
                  Saldo rekening pengirim sebelum transaksi dilakukan. Membantu
                  menganalisis pola perubahan saldo yang tidak wajar.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* New Balance Origin */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  New Balance Origin (Saldo Akhir Pengirim)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo setelah transaksi"
                  value={formData.newbalanceOrig}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("newbalanceOrig", e.target.value)
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
                  Saldo rekening pengirim setelah transaksi selesai. Digunakan
                  untuk memverifikasi konsistensi perhitungan saldo.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Old Balance Destination */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Old Balance Destination (Saldo Awal Penerima)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo penerima sebelum transaksi"
                  value={formData.oldbalanceDest}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("oldbalanceDest", e.target.value)
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
                  Saldo rekening penerima sebelum menerima transaksi. Membantu
                  mengidentifikasi pola penerimaan yang tidak biasa.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* New Balance Destination */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  New Balance Destination (Saldo Akhir Penerima)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo penerima setelah transaksi"
                  value={formData.newbalanceDest}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("newbalanceDest", e.target.value)
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
                  Saldo rekening penerima setelah menerima transaksi. Digunakan
                  untuk memverifikasi konsistensi dan mendeteksi anomali saldo.
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
                    ? "FRAUD DETECTED"
                    : "LEGITIMATE TRANSACTION"}
                </h2>

                {/* ✅ TAMBAHAN: FRAUD/NOT FRAUD Text */}
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
                        Transaksi mencurigakan terdeteksi — hentikan proses
                        transfer segera.
                      </li>
                      <li>
                        Hubungi layanan pelanggan untuk membekukan akun
                        sementara.
                      </li>
                      <li>
                        Jangan lakukan transaksi lanjutan hingga mendapatkan
                        klarifikasi dari bank.
                      </li>
                      <li>
                        Hubungi Pihak berwarjib untuk pengamanan lebih lanjut.
                      </li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1 text-green-700">
                      <li>Transaksi online Anda aman dan berhasil diproses.</li>
                      <li>
                        Pastikan koneksi internet Anda tetap aman saat
                        transaksi.
                      </li>
                      <li>
                        Hindari membagikan detail rekening kepada pihak yang
                        tidak dikenal.
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
