'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Clock, CheckCircle2, XCircle, AlertCircle, Loader2, ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { getUserOrders, updateOrderStatus, type Order } from '@/lib/api/orders'
import { smmturkClient } from '@/lib/api/smmturk-client'
import Header from '@/components/Header'
import Link from 'next/link'

const statusConfig = {
  pending: {
    label: 'Beklemede',
    icon: Clock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
  processing: {
    label: 'İşleniyor',
    icon: Loader2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  completed: {
    label: 'Tamamlandı',
    icon: CheckCircle2,
    color: 'text-primary-green',
    bgColor: 'bg-primary-green/10',
    borderColor: 'border-primary-green/30',
  },
  cancelled: {
    label: 'İptal Edildi',
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  failed: {
    label: 'Başarısız',
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
}

function OrderCard({ order, onRefresh }: { order: Order; onRefresh: () => void }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  const handleRefreshStatus = async () => {
    if (!order.smmturk_order_id) return

    setIsRefreshing(true)
    try {
      // API key is handled server-side for security
      const status = await smmturkClient.getOrderStatus(order.smmturk_order_id)
      
      // Update order status based on SMMTurk status
      let newStatus: Order['status'] = 'processing'
      if (status.status === 'Completed') {
        newStatus = 'completed'
      } else if (status.status === 'Canceled') {
        newStatus = 'cancelled'
      } else if (status.status === 'Partial' || status.status === 'In progress') {
        newStatus = 'processing'
      }

      await updateOrderStatus(order.id, newStatus, order.smmturk_order_id)
      onRefresh()
    } catch (error) {
      console.error('Error refreshing order status:', error)
      alert('Durum güncellenirken bir hata oluştu')
    } finally {
      setIsRefreshing(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className={`bg-dark-card rounded-2xl p-6 border ${config.borderColor} hover:border-opacity-60 transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0 border ${config.borderColor}`}>
            <StatusIcon className={`w-6 h-6 ${config.color} ${order.status === 'processing' ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-1 truncate">{order.package_name}</h3>
            <p className="text-gray-400 text-sm mb-2">{order.service_name}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`px-3 py-1 rounded-lg ${config.bgColor} border ${config.borderColor} ${config.color} text-sm font-semibold`}>
                {config.label}
              </span>
            </div>
          </div>
        </div>
        {order.smmturk_order_id && (
          <button
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-dark-bg hover:bg-dark-card-light transition-colors disabled:opacity-50"
            title="Durumu Yenile"
          >
            <RefreshCw className={`w-4 h-4 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-xs mb-1">Miktar</p>
          <p className="text-white font-semibold">{order.quantity.toLocaleString('tr-TR')}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Toplam Fiyat</p>
          <p className="text-primary-green font-bold text-lg">{order.total_price.toFixed(2)}₺</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-gray-400 text-xs mb-1">Link</p>
          <a
            href={order.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-green hover:text-primary-green-light text-sm flex items-center gap-1 truncate"
          >
            <span className="truncate">{order.link}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-dark-card-light">
        <p className="text-gray-500 text-xs">
          Oluşturulma: {formatDate(order.created_at)}
        </p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-6 text-center">
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-green/5 flex items-center justify-center mb-6 border-2 border-primary-green/30 shadow-lg shadow-primary-green/10">
        <Package className="w-12 h-12 text-primary-green/70" />
      </div>
      <h3 className="text-white font-bold text-xl mb-2">Henüz siparişiniz yok</h3>
      <p className="text-gray-400 text-sm max-w-[260px] mb-6 leading-relaxed">
        İlk siparişinizi vermek için hizmetlerimizi keşfedin.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-gradient-to-r from-primary-green to-primary-green-dark text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-lg shadow-primary-green/25 hover:shadow-primary-green/40 hover:scale-[1.02] transition-all active:scale-[0.98]"
      >
        <ArrowLeft className="w-4 h-4" />
        Hizmetleri Keşfet
      </Link>
    </div>
  )
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getUserOrders()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Siparişler yüklenirken bir hata oluştu')
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-primary-green transition text-xs sm:text-sm min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-white text-xs sm:text-sm">Siparişlerim</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-green/20 to-primary-green/10 flex items-center justify-center border border-primary-green/30 shadow-lg shadow-primary-green/10">
              <Package className="w-6 h-6 sm:w-7 sm:h-7 text-primary-green" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl">Siparişlerim</h1>
              <p className="text-gray-400 text-sm font-medium">
                {orders.length === 0 ? 'Henüz sipariş yok' : `${orders.length} ${orders.length === 1 ? 'sipariş' : 'sipariş'}`}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onRefresh={fetchOrders} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
