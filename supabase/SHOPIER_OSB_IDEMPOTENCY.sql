-- Shopier OSB idempotency: avoid double-processing same order
-- Run in Supabase SQL Editor before using OSB callback

CREATE TABLE IF NOT EXISTS public.shopier_processed_orders (
  orderid TEXT PRIMARY KEY,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.shopier_processed_orders ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS; allow anon for server-side insert/select if needed.
-- Minimal policy: no direct client access; callback uses service-role client.
CREATE POLICY "Service can manage shopier orders"
  ON public.shopier_processed_orders FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_shopier_processed_orders_orderid
  ON public.shopier_processed_orders(orderid);

COMMENT ON TABLE public.shopier_processed_orders IS 'Shopier OSB: processed orderids for idempotency';
