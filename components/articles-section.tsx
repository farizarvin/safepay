import { ArrowRight, Shield } from "lucide-react"

export default function ArticlesSection() {
  return (
    <section id="articles" className="relative z-10 min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="bg-gradient-to-br from-[#8B5A6B] via-[#4A5568] to-[#2D3748] rounded-2xl p-6 sm:p-8 lg:p-12 min-h-[85vh] flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 lg:mb-12 animate-fade-in-up text-center">
            Artikel Terkait
          </h2>

          <div className="space-y-6 lg:space-y-8 flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
            {/* Article 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 hover:bg-white/20 transition-all duration-300 group animate-fade-in-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="w-10 h-7 sm:w-12 sm:h-8 bg-gray-600 rounded flex items-center justify-center">
                    <div className="w-7 h-5 sm:w-8 sm:h-6 bg-white rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 group-hover:text-[#FF5F31] transition-colors leading-tight">
                  Cara Mudah Kenali Ciri-ciri Penipuan Digital yang Sering Menjerat Pengguna Awam
                </h3>
                <p className="text-white/70 text-sm sm:text-base">18 Agustus 2025</p>
              </div>
              <button className="text-[#FF5F31] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group-hover:scale-110 text-base sm:text-lg">
                <span className="hidden sm:inline">Selengkapnya</span>
                <span className="sm:hidden">Baca</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Article 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 hover:bg-white/20 transition-all duration-300 group animate-fade-in-up animation-delay-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                <div className="text-blue-800 font-bold text-2xl sm:text-3xl">BI</div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 group-hover:text-[#FF5F31] transition-colors leading-tight">
                  Bank Indonesia Dorong Implementasi Teknologi Anti-Fraud di Seluruh Fintech Nasional
                </h3>
                <p className="text-white/70 text-sm sm:text-base">17 Februari 2025</p>
              </div>
              <button className="text-[#FF5F31] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group-hover:scale-110 text-base sm:text-lg">
                <span className="hidden sm:inline">Selengkapnya</span>
                <span className="sm:hidden">Baca</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Article 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 hover:bg-white/20 transition-all duration-300 group animate-fade-in-up animation-delay-200">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#4FD1C7] to-[#06B6D4] rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                <div className="text-white font-bold text-xs sm:text-sm">SafePay.AI</div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 group-hover:text-[#FF5F31] transition-colors leading-tight">
                  Mengenal Fitur-fitur Canggih dalam Aplikasi SafePay untuk Perlindungan Maksimal
                </h3>
                <p className="text-white/70 text-sm sm:text-base">27 Mei 2025</p>
              </div>
              <button className="text-[#FF5F31] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group-hover:scale-110 text-base sm:text-lg">
                <span className="hidden sm:inline">Selengkapnya</span>
                <span className="sm:hidden">Baca</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Article 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 hover:bg-white/20 transition-all duration-300 group animate-fade-in-up animation-delay-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#4FD1C7] to-[#06B6D4] rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 group-hover:text-[#FF5F31] transition-colors leading-tight">
                  Panduan Lengkap Melindungi Rekening Digital dari Ancaman Fraud dan Phishing
                </h3>
                <p className="text-white/70 text-sm sm:text-base">21 Juni 2025</p>
              </div>
              <button className="text-[#FF5F31] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group-hover:scale-110 text-base sm:text-lg">
                <span className="hidden sm:inline">Selengkapnya</span>
                <span className="sm:hidden">Baca</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
