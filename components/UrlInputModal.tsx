'use client'

import { useState, useEffect } from 'react'
import { X, Link as LinkIcon } from 'lucide-react'

interface UrlInputModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (url: string) => void
  packageName: string
  serviceName: string
}

export default function UrlInputModal({
  isOpen,
  onClose,
  onConfirm,
  packageName,
  serviceName,
}: UrlInputModalProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setUrl('')
      setError('')
    }
  }, [isOpen])

  const validateUrl = (urlString: string): boolean => {
    if (!urlString.trim()) {
      setError('Lütfen bir URL giriniz')
      return false
    }

    // Basit URL kontrolü - http/https ile başlamalı veya www ile başlamalı
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    const instagramPattern = /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)/
    const facebookPattern = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)/
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/
    const tiktokPattern = /^(https?:\/\/)?(www\.)?(tiktok\.com)/
    const twitterPattern = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/

    const normalizedUrl = urlString.trim().toLowerCase()
    
    // Genel URL kontrolü
    if (!urlPattern.test(normalizedUrl)) {
      setError('Geçerli bir URL giriniz (örn: instagram.com/kullaniciadi)')
      return false
    }

    // Servise göre URL kontrolü
    const serviceLower = serviceName.toLowerCase()
    if (serviceLower.includes('instagram') && !instagramPattern.test(normalizedUrl)) {
      setError('Instagram URL\'si giriniz (örn: instagram.com/kullaniciadi)')
      return false
    }
    if (serviceLower.includes('facebook') && !facebookPattern.test(normalizedUrl)) {
      setError('Facebook URL\'si giriniz (örn: facebook.com/sayfa)')
      return false
    }
    if (serviceLower.includes('youtube') && !youtubePattern.test(normalizedUrl)) {
      setError('YouTube URL\'si giriniz (örn: youtube.com/channel/...)')
      return false
    }
    if (serviceLower.includes('tiktok') && !tiktokPattern.test(normalizedUrl)) {
      setError('TikTok URL\'si giriniz (örn: tiktok.com/@kullaniciadi)')
      return false
    }
    if ((serviceLower.includes('twitter') || serviceLower.includes('x')) && !twitterPattern.test(normalizedUrl)) {
      setError('Twitter/X URL\'si giriniz (örn: twitter.com/kullaniciadi)')
      return false
    }

    setError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateUrl(url)) {
      // URL'yi normalize et (https:// ekle)
      let normalizedUrl = url.trim()
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = 'https://' + normalizedUrl
      }
      onConfirm(normalizedUrl)
      setUrl('')
      setError('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-dark-card rounded-xl p-4 sm:p-6 w-full max-w-md border border-dark-card-light shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-green/20 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-primary-green" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">URL Girişi</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Paket için URL giriniz</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Package Info */}
        <div className="bg-dark-card-light rounded-lg p-3 mb-4">
          <p className="text-gray-400 text-xs mb-1">Paket:</p>
          <p className="text-white font-semibold text-sm">{packageName}</p>
          <p className="text-gray-400 text-xs mt-1">Servis: {serviceName}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url-input" className="block text-gray-300 text-sm mb-2">
              {serviceName} URL'si
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError('')
              }}
              placeholder={`Örn: instagram.com/kullaniciadi veya ${serviceName.toLowerCase()}.com/...`}
              className="w-full bg-dark-bg text-white px-4 py-3 rounded-lg border border-dark-card-light focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all placeholder:text-gray-500 text-sm"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-2">{error}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-dark-card-light text-gray-300 hover:text-white py-3 px-4 rounded-lg transition-colors font-semibold text-sm min-h-[44px]"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-3 px-4 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 font-semibold text-sm min-h-[44px]"
            >
              Onayla ve Sepete Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
