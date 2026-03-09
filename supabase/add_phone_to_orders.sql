-- Sipariş tablosuna telefon alanı ekleme
-- Sipariş bildirimleri için iletişim numarası (zorunlu değil mevcut siparişler için)
-- Supabase SQL Editor'da çalıştırın

ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS phone TEXT;

COMMENT ON COLUMN public.orders.phone IS 'Sipariş bildirimleri için iletişim telefonu (sepetten alınır)';
