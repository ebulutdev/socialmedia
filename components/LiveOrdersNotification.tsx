'use client'

import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, X } from 'lucide-react'

// Hazır bildirim metinleri
const notificationMessages = [
  { city: 'Bursa', service: 'Instagram', action: '100 Takipçi', time: '2 dakika önce' },
  { city: 'Gaziantep', service: 'Instagram', action: '500 Beğeni', time: '3 dakika önce' },
  { city: 'İstanbul', service: 'Instagram', action: '1.000 Takipçi', time: '4 dakika önce' },
  { city: 'Bayburt', service: 'Instagram', action: '250 Beğeni', time: '5 dakika önce' },
  { city: 'Ankara', service: 'Instagram', action: '2.000 İzlenme', time: '6 dakika önce' },
  { city: 'İzmir', service: 'Instagram', action: '750 Takipçi', time: '7 dakika önce' },
  { city: 'Antalya', service: 'Facebook', action: '500 Takipçi', time: '8 dakika önce' },
  { city: 'Adana', service: 'Facebook', action: '1.000 Beğeni', time: '9 dakika önce' },
  { city: 'Konya', service: 'YouTube', action: '50 Abone', time: '10 dakika önce' },
  { city: 'Kayseri', service: 'YouTube', action: '5.000 İzlenme', time: '11 dakika önce' },
  { city: 'Trabzon', service: 'TikTok', action: '300 Takipçi', time: '12 dakika önce' },
  { city: 'Samsun', service: 'TikTok', action: '1.500 Beğeni', time: '13 dakika önce' },
  { city: 'Bursa', service: 'Twitter', action: '200 Takipçi', time: '14 dakika önce' },
  { city: 'Gaziantep', service: 'Twitter', action: '500 Beğeni', time: '15 dakika önce' },
  { city: 'İstanbul', service: 'Twitch', action: '100 Takipçi', time: '16 dakika önce' },
  { city: 'Bayburt', service: 'Twitch', action: '1.000 İzlenme', time: '17 dakika önce' },
  { city: 'Ankara', service: 'Instagram', action: '3.000 Takipçi', time: '18 dakika önce' },
  { city: 'İzmir', service: 'Instagram', action: '2.500 Beğeni', time: '19 dakika önce' },
  { city: 'Antalya', service: 'Facebook', action: '750 Takipçi', time: '20 dakika önce' },
  { city: 'Adana', service: 'YouTube', action: '100 Abone', time: '21 dakika önce' },
  { city: 'Konya', service: 'TikTok', action: '500 Takipçi', time: '22 dakika önce' },
  { city: 'Kayseri', service: 'Twitter', action: '300 Takipçi', time: '23 dakika önce' },
  { city: 'Trabzon', service: 'Instagram', action: '1.500 Takipçi', time: '24 dakika önce' },
  { city: 'Samsun', service: 'Instagram', action: '800 Beğeni', time: '25 dakika önce' },
  { city: 'Bursa', service: 'YouTube', action: '10.000 İzlenme', time: '26 dakika önce' },
  { city: 'Gaziantep', service: 'TikTok', action: '2.000 Takipçi', time: '27 dakika önce' },
  { city: 'İstanbul', service: 'Facebook', action: '1.500 Beğeni', time: '28 dakika önce' },
  { city: 'Bayburt', service: 'Twitch', action: '500 Takipçi', time: '29 dakika önce' },
  { city: 'Ankara', service: 'Instagram', action: '5.000 İzlenme', time: '30 dakika önce' },
]

interface Notification {
  id: string
  city: string
  service: string
  action: string
  time: string
}

export default function LiveOrdersNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  // Rastgele bir bildirim seç
  const getRandomNotification = (): Notification => {
    const randomIndex = Math.floor(Math.random() * notificationMessages.length)
    const message = notificationMessages[randomIndex]
    return {
      id: Math.random().toString(36).substring(7),
      ...message,
    }
  }

  // Bildirimi otomatik kaldır
  const scheduleAutoRemove = (id: string) => {
    const timeout = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      timeoutsRef.current.delete(id)
    }, 8000) // 8 saniye sonra kaldır
    timeoutsRef.current.set(id, timeout)
  }

  useEffect(() => {
    if (!isVisible) return

    let intervalId: NodeJS.Timeout | null = null

    // Rastgele süre seç (3, 5 veya 7 dakika)
    const getRandomDelay = (): number => {
      const delays = [180000, 300000, 420000] // 3dk, 5dk, 7dk (milisaniye cinsinden)
      return delays[Math.floor(Math.random() * delays.length)]
    }

    // İlk bildirimi rastgele bir süre sonra göster (3, 5 veya 7 dakika)
    const firstDelay = getRandomDelay()
    const firstTimeout = setTimeout(() => {
      const firstNotification = getRandomNotification()
      setNotifications([firstNotification])
      scheduleAutoRemove(firstNotification.id)

      // İlk bildirimden sonra rastgele aralıklarla yeni bildirimler ekle
      const scheduleNext = () => {
        const delay = getRandomDelay() // 3, 5 veya 7 dakika
        intervalId = setTimeout(() => {
          const newNotification = getRandomNotification()
          setNotifications((prev) => {
            // Maksimum 2 bildirim göster, en eskisini kaldır
            const updated = [...prev, newNotification]
            if (updated.length > 2) {
              const removed = updated.shift()
              if (removed) {
                const timeout = timeoutsRef.current.get(removed.id)
                if (timeout) {
                  clearTimeout(timeout)
                  timeoutsRef.current.delete(removed.id)
                }
              }
            }
            return updated
          })
          scheduleAutoRemove(newNotification.id)
          // Bir sonraki bildirimi planla
          scheduleNext()
        }, delay)
      }

      scheduleNext()
    }, firstDelay)

    return () => {
      clearTimeout(firstTimeout)
      if (intervalId) clearTimeout(intervalId)
      // Tüm timeout'ları temizle
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
      timeoutsRef.current.clear()
    }
  }, [isVisible])

  // Bildirimi kapat
  const removeNotification = (id: string) => {
    const timeout = timeoutsRef.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutsRef.current.delete(id)
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Tüm bildirimleri kapat
  const closeAll = () => {
    setIsVisible(false)
    setNotifications([])
  }

  if (!isVisible || notifications.length === 0) return null

  return (
    <div className="fixed bottom-20 right-3 sm:right-4 z-[101] flex flex-col gap-1.5 max-w-[260px] pointer-events-none">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="pointer-events-auto animate-slide-in-right bg-dark-card/95 backdrop-blur-md border border-primary-green/20 rounded-lg p-2 shadow-xl"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex items-start gap-2 group">
            <div className="w-7 h-7 bg-primary-green/15 rounded-md flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-3.5 h-3.5 text-primary-green" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-primary-green font-medium text-[10px] leading-tight">
                  {notification.city}
                </span>
                <span className="text-gray-500 text-[9px]">•</span>
                <span className="text-gray-500 text-[9px]">{notification.time}</span>
              </div>
              <p className="text-white text-[10px] leading-tight">
                <span className="text-primary-green font-medium">{notification.service}</span>{' '}
                <span className="text-gray-300">{notification.action}</span>
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 hover:bg-dark-card-light rounded p-0.5 transition text-gray-500 hover:text-white opacity-0 group-hover:opacity-100"
              aria-label="Kapat"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
          {/* Otomatik kapanma progress bar - minimal */}
          <div className="mt-1.5 h-[1px] bg-dark-card-light rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-green animate-progress"
              style={{
                animationDuration: '8s',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
