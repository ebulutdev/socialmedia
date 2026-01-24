-- Service Prices Table for Admin Panel
-- This table stores all service prices for admin reference only
-- Run this SQL in your Supabase SQL Editor

-- Service Prices Table
CREATE TABLE IF NOT EXISTS public.service_prices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  price_per_1k DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('follower', 'like', 'view', 'engagement', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(service_id, package_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.service_prices ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only authenticated users can view service prices
-- Note: Admin check is done in the API layer (app/api/admin/services/route.ts)
-- RLS here just ensures only authenticated users can access
CREATE POLICY "Authenticated users can view service prices"
  ON public.service_prices FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- RLS Policy: Only authenticated users can insert service prices
-- Admin check is done in API layer
CREATE POLICY "Authenticated users can insert service prices"
  ON public.service_prices FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policy: Only authenticated users can update service prices
-- Admin check is done in API layer
CREATE POLICY "Authenticated users can update service prices"
  ON public.service_prices FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- RLS Policy: Only authenticated users can delete service prices
-- Admin check is done in API layer
CREATE POLICY "Authenticated users can delete service prices"
  ON public.service_prices FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_service_prices_updated_at
  BEFORE UPDATE ON public.service_prices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_prices_service_id ON public.service_prices(service_id);
CREATE INDEX IF NOT EXISTS idx_service_prices_category ON public.service_prices(category);
CREATE INDEX IF NOT EXISTS idx_service_prices_package_id ON public.service_prices(package_id);

-- Grant permissions
GRANT ALL ON public.service_prices TO authenticated;
