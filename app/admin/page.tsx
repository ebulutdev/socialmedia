'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Package, Clock, CheckCircle2, XCircle, AlertCircle, Loader2, ArrowLeft, ExternalLink, User, Mail } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import Header from '@/components/Header'

interface AdminOrder {
  id: string
  user_id: string
  user_email: string | null
  user_name: string | null
  service_id: string
  service_name: string
  package_id: string
  package_name: string
  quantity: number
  link: string
  price: number
  total_price: number
  smmturk_order_id: number | null
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed'
  created_at: string
  updated_at: string
}

const statusConfig = {
  pending: { label: 'Beklemede', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  processing: { label: 'İşleniyor', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  completed: { label: 'Tamamlandı', color: 'text-primary-green', bg: 'bg-primary-green/10' },
  cancelled: { label: 'İptal', color: 'text-red-400', bg: 'bg-red-500/10' },
  failed: { label: 'Başarısız', color: 'text-red-400', bg: 'bg-red-500/10' },
}

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/orders')
      
      if (!response.ok) {
        if (response.status === 403) {
          setError('Bu sayfaya erişim yetkiniz yok')
          return
        }
        throw new Error('Siparişler yüklenemedi')
      }

      const data = await response.json()
      setOrders(data.orders || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login')
      } else {
        fetchOrders()
      }
    }
  }, [user, authLoading, router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-6 h-6 text-primary-green animate-spin" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (error && error.includes('yetkiniz yok')) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-white font-bold text-lg mb-2">Erişim Reddedildi</h2>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0)
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'completed').length

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-gray-400 hover:text-primary-green transition text-xs"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Geri</span>
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary-green" />
            <h1 className="text-white font-bold text-lg">Admin Paneli</h1>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <div className="bg-dark-card rounded-lg p-2 border border-dark-card-light">
              <p className="text-gray-400 text-[10px] mb-1">Toplam Sipariş</p>
              <p className="text-white font-semibold text-xs">{totalOrders}</p>
            </div>
            <div className="bg-dark-card rounded-lg p-2 border border-dark-card-light">
              <p className="text-gray-400 text-[10px] mb-1">Beklemede</p>
              <p className="text-yellow-400 font-semibold text-xs">{pendingOrders}</p>
            </div>
            <div className="bg-dark-card rounded-lg p-2 border border-dark-card-light">
              <p className="text-gray-400 text-[10px] mb-1">Tamamlanan</p>
              <p className="text-primary-green font-semibold text-xs">{completedOrders}</p>
            </div>
            <div className="bg-dark-card rounded-lg p-2 border border-dark-card-light">
              <p className="text-gray-400 text-[10px] mb-1">Toplam Gelir</p>
              <p className="text-primary-green font-semibold text-xs">{totalRevenue.toFixed(2)}₺</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        <div className="bg-dark-card rounded-lg border border-dark-card-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-dark-card-light border-b border-dark-card-light">
                  <th className="text-left p-2 text-gray-400 font-medium">Tarih</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Kullanıcı</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Hizmet</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Miktar</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Birim Fiyat</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Toplam</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Durum</th>
                  <th className="text-left p-2 text-gray-400 font-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-400 text-xs">
                      Henüz sipariş yok
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const status = statusConfig[order.status]
                    return (
                      <tr key={order.id} className="border-b border-dark-card-light hover:bg-dark-card-light/50 transition-colors">
                        <td className="p-2 text-gray-300 whitespace-nowrap">{formatDate(order.created_at)}</td>
                        <td className="p-2">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1 text-white">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-[11px]">{order.user_name || 'İsimsiz'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                              <Mail className="w-3 h-3" />
                              <span className="text-[10px]">{order.user_email || '-'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-white text-[11px]">{order.service_name}</span>
                            <span className="text-gray-400 text-[10px]">{order.package_name}</span>
                          </div>
                        </td>
                        <td className="p-2 text-gray-300 text-[11px]">{order.quantity.toLocaleString('tr-TR')}</td>
                        <td className="p-2 text-gray-300 text-[11px]">{order.price.toFixed(2)}₺</td>
                        <td className="p-2 text-primary-green font-semibold text-[11px]">{order.total_price.toFixed(2)}₺</td>
                        <td className="p-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="p-2">
                          <a
                            href={order.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-green hover:text-primary-green-light text-[10px] flex items-center gap-1"
                          >
                            <span className="truncate max-w-[100px]">{order.link}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
