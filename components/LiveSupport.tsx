'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import Link from 'next/link'

export default function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const supportRef = useRef<HTMLDivElement>(null)
  const whatsappNumber = '905521172505' // 0552 117 25 05
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  // Dışarı tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="fixed right-4 bottom-4 z-[102] block" ref={supportRef}>
      {/* Açılır Kutu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl p-4 mb-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-sm">Canlı Destek</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-300 text-xs mb-4">
            Sorularınız için WhatsApp üzerinden bize ulaşabilirsiniz.
          </p>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary-green text-white px-4 py-2.5 rounded-lg hover:bg-primary-green-dark transition text-center text-sm font-semibold"
          >
            WhatsApp ile İletişime Geç
          </Link>
        </div>
      )}

      {/* Ana Buton */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-green text-white p-3 rounded-full shadow-lg shadow-primary-green/30 hover:shadow-primary-green/40 hover:bg-primary-green-dark transition-all min-w-[52px] sm:min-w-[56px] min-h-[52px] sm:min-h-[56px] flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}
