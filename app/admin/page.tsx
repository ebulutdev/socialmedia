'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Package, Clock, CheckCircle2, XCircle, AlertCircle, Loader2, ArrowLeft, ExternalLink, User, Mail, DollarSign, ChevronDown, ChevronUp, RefreshCw, Edit2, Save, X } from 'lucide-react'
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

interface ServicePrice {
  id: string
  service_id: string
  service_name: string
  package_id: string
  package_name: string
  price_per_1k: number
  category: 'follower' | 'like' | 'view' | 'engagement' | 'other'
  created_at?: string
  updated_at?: string
}

const statusConfig = {
  pending: { label: 'Beklemede', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  processing: { label: 'İşleniyor', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  completed: { label: 'Tamamlandı', color: 'text-primary-green', bg: 'bg-primary-green/10' },
  cancelled: { label: 'İptal', color: 'text-red-400', bg: 'bg-red-500/10' },
  failed: { label: 'Başarısız', color: 'text-red-400', bg: 'bg-red-500/10' },
}

type TabType = 'orders' | 'services'

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('orders')
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([])
  const [groupedServices, setGroupedServices] = useState<Record<string, ServicePrice[]>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    follower: true,
    like: true,
    view: true,
    engagement: true,
    other: true
  })
  const [loading, setLoading] = useState(true)
  const [servicesLoading, setServicesLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/orders')
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 403) {
          const debugInfo = data.debug
          const errorMsg = debugInfo 
            ? `Bu sayfaya erişim yetkiniz yok. Giriş yaptığınız email: ${user?.email || 'Bilinmiyor'}`
            : 'Bu sayfaya erişim yetkiniz yok'
          setError(errorMsg)
          return
        }
        throw new Error(data.error || 'Siparişler yüklenemedi')
      }

      setOrders(data.orders || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      setServicesLoading(true)
      setError(null)
      const response = await fetch('/api/admin/services')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Hizmetler yüklenemedi')
      }

      setServicePrices(data.services || [])
      setGroupedServices(data.groupedByCategory || {})
      
      // Debug: Twitch hizmetlerini kontrol et
      const twitchServices = (data.services || []).filter((s: ServicePrice) => s.service_id === 'twitch')
      console.log('Twitch services loaded:', twitchServices.length, twitchServices)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setServicesLoading(false)
    }
  }

  const loadServicesToDatabase = async () => {
    try {
      setServicesLoading(true)
      setError(null)
      const response = await fetch('/api/admin/services', {
        method: 'POST'
      })
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Hizmetler yüklenemedi')
      }

      // Yükleme sonrası listeyi yenile
      await fetchServices()
      alert(data.message || `Başarılı! ${data.count || 0} hizmet fiyatı veritabanına yüklendi.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      alert('Hata: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    } finally {
      setServicesLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login')
      } else {
        fetchOrders()
        if (activeTab === 'services') {
          fetchServices()
        }
      }
    }
  }, [user, authLoading, router, activeTab])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const startEditing = (service: ServicePrice) => {
    setEditingId(service.id)
    setEditPrice(service.price_per_1k)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditPrice(0)
  }

  const updateOrderStatus = async (orderId: string, newStatus: AdminOrder['status']) => {
    try {
      setUpdatingOrderId(orderId)
      setError(null)
      
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sipariş durumu güncellenemedi')
      }

      // State'i güncelle
      setOrders(prev => 
        prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sipariş durumu güncellenirken bir hata oluştu')
      alert('Hata: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    } finally {
      setUpdatingOrderId(null)
    }
  }

  const updatePrice = async (serviceId: string) => {
    if (editPrice <= 0) {
      alert('Fiyat 0\'dan büyük olmalıdır')
      return
    }

    try {
      setUpdatingId(serviceId)
      setError(null)
      
      const response = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: serviceId,
          price_per_1k: editPrice
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Fiyat güncellenemedi')
      }

      // State'i güncelle
      setServicePrices(prev => 
        prev.map(sp => sp.id === serviceId ? { ...sp, price_per_1k: editPrice } : sp)
      )

      // Grouped services'i de güncelle
      setGroupedServices(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(category => {
          updated[category] = updated[category].map(sp => 
            sp.id === serviceId ? { ...sp, price_per_1k: editPrice } : sp
          )
        })
        return updated
      })

      setEditingId(null)
      setEditPrice(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fiyat güncellenirken bir hata oluştu')
      alert('Hata: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    } finally {
      setUpdatingId(null)
    }
  }

  const categoryLabels: Record<string, string> = {
    follower: 'Takipçi',
    like: 'Beğeni',
    view: 'İzlenme',
    engagement: 'Etkileşim',
    other: 'Diğer'
  }

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
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-white font-bold text-lg mb-2 text-center">Erişim Reddedildi</h2>
            <p className="text-gray-400 text-sm mb-4 text-center">{error}</p>
            {user?.email && (
              <div className="bg-dark-card rounded-lg p-4 mt-4">
                <p className="text-gray-400 text-xs mb-2">Giriş yaptığınız email:</p>
                <p className="text-white text-sm font-mono">{user.email}</p>
                <p className="text-gray-500 text-xs mt-3">Not: Admin email'i .env.local dosyasında ADMIN_EMAILS değişkeninde tanımlı olmalıdır.</p>
              </div>
            )}
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
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-dark-card-light">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'text-primary-green border-b-2 border-primary-green'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Siparişler
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === 'services'
                  ? 'text-primary-green border-b-2 border-primary-green'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Hizmet Fiyatları
            </button>
          </div>

          {/* Stats - Sadece orders tab'ında göster */}
          {activeTab === 'orders' && (
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
          )}
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        {activeTab === 'orders' && (
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
                    <th className="text-left p-2 text-gray-400 font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-gray-400 text-xs">
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
                          <td className="p-2">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as AdminOrder['status'])}
                              disabled={updatingOrderId === order.id}
                              className={`text-[10px] px-2 py-1 rounded border bg-dark-card-light text-white border-dark-card-light focus:outline-none focus:border-primary-green ${
                                updatingOrderId === order.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                              }`}
                            >
                              <option value="pending">Beklemede</option>
                              <option value="processing">İşleniyor</option>
                              <option value="completed">Tamamlandı</option>
                              <option value="cancelled">İptal</option>
                              <option value="failed">Başarısız</option>
                            </select>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-3">
            {/* Yükleme Butonu */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-xs">
                {servicePrices.length > 0 
                  ? `${servicePrices.length} hizmet fiyatı kayıtlı` 
                  : 'Henüz hizmet fiyatı yüklenmemiş'}
              </p>
              <button
                onClick={loadServicesToDatabase}
                disabled={servicesLoading}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-green hover:bg-primary-green-light text-white text-xs rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {servicesLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Yükleniyor...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3" />
                    <span>Hizmetleri Yükle</span>
                  </>
                )}
              </button>
            </div>

            {servicesLoading && servicePrices.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary-green animate-spin" />
              </div>
            ) : servicePrices.length === 0 ? (
              <div className="bg-dark-card rounded-lg border border-dark-card-light p-6 text-center">
                <Package className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Henüz hizmet fiyatı yüklenmemiş</p>
                <p className="text-gray-500 text-xs">Yukarıdaki "Hizmetleri Yükle" butonuna tıklayarak tüm hizmetleri veritabanına yükleyebilirsiniz.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(groupedServices).map(([category, services]) => {
                  if (services.length === 0) return null
                  const isExpanded = expandedCategories[category]
                  
                  return (
                    <div key={category} className="bg-dark-card rounded-lg border border-dark-card-light overflow-hidden">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between p-3 hover:bg-dark-card-light transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary-green" />
                          <span className="text-white font-semibold text-sm">
                            {categoryLabels[category] || category} ({services.length})
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="border-t border-dark-card-light">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-dark-card-light border-b border-dark-card-light">
                                  <th className="text-left p-2 text-gray-400 font-medium">Service ID</th>
                                  <th className="text-left p-2 text-gray-400 font-medium">Hizmet</th>
                                  <th className="text-left p-2 text-gray-400 font-medium">Package ID</th>
                                  <th className="text-left p-2 text-gray-400 font-medium">Paket Adı</th>
                                  <th className="text-left p-2 text-gray-400 font-medium">1K Fiyatı</th>
                                  <th className="text-left p-2 text-gray-400 font-medium">İşlem</th>
                                </tr>
                              </thead>
                              <tbody>
                                {services.map((service) => {
                                  const isEditing = editingId === service.id
                                  const isUpdating = updatingId === service.id
                                  
                                  return (
                                    <tr key={service.id} className="border-b border-dark-card-light hover:bg-dark-card-light/50 transition-colors">
                                      <td className="p-2 text-gray-300 text-[11px] font-mono">{service.service_id}</td>
                                      <td className="p-2 text-white text-[11px]">{service.service_name}</td>
                                      <td className="p-2 text-gray-300 text-[11px] font-mono">{service.package_id}</td>
                                      <td className="p-2 text-gray-300 text-[11px]">{service.package_name}</td>
                                      <td className="p-2">
                                        {isEditing ? (
                                          <div className="flex items-center gap-1">
                                            <input
                                              type="number"
                                              step="0.01"
                                              min="0"
                                              value={editPrice}
                                              onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                                              className="w-20 px-2 py-1 bg-dark-card-light border border-primary-green/30 rounded text-[11px] text-white focus:outline-none focus:border-primary-green"
                                              autoFocus
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                  updatePrice(service.id)
                                                } else if (e.key === 'Escape') {
                                                  cancelEditing()
                                                }
                                              }}
                                            />
                                            <span className="text-primary-green text-[11px]">₺</span>
                                          </div>
                                        ) : (
                                          <span className="text-primary-green font-semibold text-[11px]">
                                            {service.price_per_1k.toFixed(2)}₺
                                          </span>
                                        )}
                                      </td>
                                      <td className="p-2">
                                        {isEditing ? (
                                          <div className="flex items-center gap-1">
                                            <button
                                              onClick={() => updatePrice(service.id)}
                                              disabled={isUpdating}
                                              className="p-1 bg-primary-green hover:bg-primary-green-light text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                              title="Kaydet"
                                            >
                                              {isUpdating ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                              ) : (
                                                <Save className="w-3 h-3" />
                                              )}
                                            </button>
                                            <button
                                              onClick={cancelEditing}
                                              disabled={isUpdating}
                                              className="p-1 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                              title="İptal"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </div>
                                        ) : (
                                          <button
                                            onClick={() => startEditing(service)}
                                            className="p-1 bg-dark-card-light hover:bg-primary-green/20 text-gray-400 hover:text-primary-green rounded transition-colors"
                                            title="Düzenle"
                                          >
                                            <Edit2 className="w-3 h-3" />
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
