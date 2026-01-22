'use client'

export default function LiveSupport() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
      <button className="bg-primary-green text-white px-3 sm:px-4 py-6 sm:py-8 rounded-l-2xl active:bg-primary-green-dark sm:hover:bg-primary-green-dark transition shadow-lg min-h-[120px] sm:min-h-[140px] touch-manipulation">
        <div className="writing-vertical-rl text-xs sm:text-sm font-semibold">
          Canlı Destek (Çevrimiçi)
        </div>
      </button>
    </div>
  )
}
