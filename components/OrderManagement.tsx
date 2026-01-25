'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, XCircle, RefreshCw, X } from 'lucide-react'
import { smmturkClient } from '@/lib/api/smmturk-client'

interface OrderManagementProps {
  // API key is handled server-side for security
}

export default function OrderManagement({}: OrderManagementProps) {
  const [orderIds, setOrderIds] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderStatuses, setOrderStatuses] = useState<Record<string, any>>({})
  const [balance, setBalance] = useState<{ balance: string; currency: string } | null>(null)

  const handleCheckStatus = async () => {
    if (!orderIds.trim()) {
      alert('Lütfen sipariş ID\'lerini girin (virgülle ayırın)')
      return
    }

    setIsLoading(true)
    try {
      const ids = orderIds.split(',').map((id) => parseInt(id.trim())).filter((id) => !isNaN(id))
      if (ids.length === 0) {
        alert('Geçerli sipariş ID\'leri girin')
        return
      }

      const statuses = await smmturkClient.getMultipleOrderStatus(ids)
      setOrderStatuses(statuses)
    } catch (error) {
      alert('Sipariş durumu alınırken hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetBalance = async () => {
    setIsLoading(true)
    try {
      const bal = await smmturkClient.getBalance()
      setBalance(bal)
    } catch (error) {
      alert('Bakiye bilgisi alınırken hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelOrders = async () => {
    if (!orderIds.trim()) {
      alert('Lütfen iptal edilecek sipariş ID\'lerini girin')
      return
    }

    if (!confirm('Bu siparişleri iptal etmek istediğinize emin misiniz?')) {
      return
    }

    setIsLoading(true)
    try {
      const ids = orderIds.split(',').map((id) => parseInt(id.trim())).filter((id) => !isNaN(id))
      const results = await smmturkClient.cancelOrders(ids)
      
      const successCount = results.filter((r: any) => r.cancel === 1).length
      alert(`${successCount}/${results.length} sipariş iptal edildi`)
      
      // Refresh status after cancel
      if (ids.length > 0) {
        const statuses = await smmturkClient.getMultipleOrderStatus(ids)
        setOrderStatuses(statuses)
      }
    } catch (error) {
      alert('Sipariş iptal edilirken hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-dark-card rounded-2xl p-6 border border-dark-card-light/80 space-y-6">
      <h2 className="text-white font-bold text-xl mb-4">Sipariş Yönetimi</h2>

      {/* Balance Section */}
      <div className="bg-dark-bg rounded-xl p-4 border border-dark-card-light/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">Bakiye</h3>
          <button
            onClick={handleGetBalance}
            disabled={isLoading}
            className="text-primary-green hover:text-primary-green-dark text-sm font-medium disabled:opacity-50 flex items-center gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
        {balance && (
          <div className="flex items-center gap-2">
            <span className="text-primary-green font-bold text-lg">
              {parseFloat(balance.balance).toFixed(2)} {balance.currency}
            </span>
          </div>
        )}
      </div>

      {/* Order Status Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Sipariş ID'leri (virgülle ayırın)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={orderIds}
              onChange={(e) => setOrderIds(e.target.value)}
              placeholder="23501, 23502, 23503"
              className="flex-1 px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-card-light text-white placeholder-gray-500 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all text-sm"
            />
            <button
              onClick={handleCheckStatus}
              disabled={isLoading || !orderIds.trim()}
              className="px-4 py-2.5 rounded-xl bg-primary-green text-white font-semibold text-sm hover:bg-primary-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Durum Kontrol
            </button>
          </div>
        </div>

        {/* Order Status Results */}
        {Object.keys(orderStatuses).length > 0 && (
          <div className="space-y-2">
            {Object.entries(orderStatuses).map(([orderId, status]: [string, any]) => (
              <div
                key={orderId}
                className={`p-4 rounded-xl border ${
                  status.error
                    ? 'bg-red-500/10 border-red-500/30'
                    : status.status === 'Completed'
                    ? 'bg-primary-green/10 border-primary-green/30'
                    : 'bg-dark-bg border-dark-card-light/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">Sipariş #{orderId}</span>
                    {status.error ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : status.status === 'Completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary-green" />
                    ) : null}
                  </div>
                </div>
                {status.error ? (
                  <p className="text-red-400 text-sm">{status.error}</p>
                ) : (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Durum:</span>
                      <span className="text-white font-medium">{status.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Başlangıç:</span>
                      <span className="text-white">{status.start_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kalan:</span>
                      <span className="text-white">{status.remains}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ücret:</span>
                      <span className="text-primary-green font-semibold">
                        {parseFloat(status.charge).toFixed(2)} {status.currency}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Cancel Orders Button */}
        {orderIds.trim() && (
          <button
            onClick={handleCancelOrders}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siparişleri İptal Et
          </button>
        )}
      </div>
    </div>
  )
}
