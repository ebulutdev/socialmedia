'use client'

import { Mail, Phone } from 'lucide-react'

export default function IletisimPage() {
  return (
    <div className="bg-dark-card rounded-xl p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl sm:text-2xl">💬</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">İletişim</h1>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-dark-card-light rounded-lg p-4 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-1">E-posta</h3>
                        <a href="mailto:asocialmedianiz@gmail.com" className="text-primary-green hover:text-primary-green-light transition text-sm sm:text-base">
                          asocialmedianiz@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-card-light rounded-lg p-4 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Telefon</h3>
                        <a href="https://wa.me/905339651925" className="text-primary-green hover:text-primary-green-light transition text-sm sm:text-base">
                          0533 965 19 25
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-card-light rounded-lg p-4 sm:p-5">
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-3">Şirket Bilgileri</h3>
                      <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                        <p><strong className="text-white">Vergi Dairesi:</strong> Gazimağusa</p>
                        <p><strong className="text-white">Vergi Numarası:</strong> 160018143</p>
                        <p><strong className="text-white">SLBT No:</strong> 1078</p>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  )
}
