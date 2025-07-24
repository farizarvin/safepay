import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 min-h-screen flex flex-col">
      {/* Footer Header */}
      <div className="bg-gradient-to-r from-[#EE4312] to-[#FF5F31] py-8 sm:py-10 hover:from-[#FF5F31] hover:to-[#EE4312] transition-all duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-[-0.05em] animate-fade-in-up text-center">
            Contact Us
          </h2>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-[#0E1947]/90 backdrop-blur-sm flex-1 flex items-center py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Contact Information */}
            <div className="space-y-8 lg:space-y-10 text-center lg:text-left animate-fade-in-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6 group hover:scale-105 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white border-2 border-white rounded-lg p-1 flex-shrink-0 group-hover:text-[#FF5F31] group-hover:border-[#FF5F31] transition-colors" />
                <div>
                  <p className="text-white text-base sm:text-lg leading-relaxed">
                    Universitas Dian Nuswantoro Kota Semarang, Jawa Tengah
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center lg:items-center gap-4 sm:gap-6 group hover:scale-105 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white border-2 border-white rounded-lg p-1 flex-shrink-0 group-hover:text-[#FF5F31] group-hover:border-[#FF5F31] transition-colors" />
                <div>
                  <p className="text-white text-base sm:text-lg font-semibold">+62 0812 3456 7890</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center lg:items-center gap-4 sm:gap-6 group hover:scale-105 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white border-2 border-white rounded-lg p-1 flex-shrink-0 group-hover:text-[#FF5F31] group-hover:border-[#FF5F31] transition-colors" />
                <div>
                  <p className="text-white text-base sm:text-lg">support@safepay.ai</p>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left animate-fade-in-right">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold italic text-white leading-tight">
                About Us
              </h3>
              <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                SafePay.AI adalah platform inovatif yang menggunakan kecerdasan buatan untuk mendeteksi dan mencegah
                penipuan dalam transaksi digital. Kami berkomitmen untuk melindungi pengguna dari berbagai ancaman
                keamanan finansial online.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-white/20">
            <p className="text-white/80 text-center text-base sm:text-lg">
              © 2025 SafePay.AI. Semua hak cipta dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
