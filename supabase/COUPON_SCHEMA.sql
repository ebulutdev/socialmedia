-- Coupon System Schema Update
-- Run this SQL in your Supabase SQL Editor

-- Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  value DECIMAL(10, 2) NOT NULL UNIQUE,
  sophier_link TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User Coupons Table (tracks purchased coupons)
CREATE TABLE IF NOT EXISTS public.user_coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  is_used BOOLEAN DEFAULT false,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE SET NULL
);

-- Update transactions table to include coupon_id
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS coupon_id UUID REFERENCES public.coupons(id) ON DELETE SET NULL;

-- Enable Row Level Security
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_coupons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Coupons (everyone can view active coupons)
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.coupons;
CREATE POLICY "Anyone can view active coupons"
  ON public.coupons FOR SELECT
  USING (is_active = true);

-- RLS Policies for User Coupons
DROP POLICY IF EXISTS "Users can view own coupons" ON public.user_coupons;
CREATE POLICY "Users can view own coupons"
  ON public.user_coupons FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own coupon purchases" ON public.user_coupons;
CREATE POLICY "Users can create own coupon purchases"
  ON public.user_coupons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at on coupons
DROP TRIGGER IF EXISTS update_coupons_updated_at ON public.coupons;
CREATE TRIGGER update_coupons_updated_at
  BEFORE UPDATE ON public.coupons
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_coupons_is_active ON public.coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_value ON public.coupons(value);
CREATE INDEX IF NOT EXISTS idx_user_coupons_user_id ON public.user_coupons(user_id);
CREATE INDEX IF NOT EXISTS idx_user_coupons_coupon_id ON public.user_coupons(coupon_id);
CREATE INDEX IF NOT EXISTS idx_transactions_coupon_id ON public.transactions(coupon_id);

-- Function to calculate user balance from transactions
CREATE OR REPLACE FUNCTION public.get_user_balance(p_user_id UUID)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
  v_balance DECIMAL(10, 2) := 0;
BEGIN
  SELECT COALESCE(SUM(
    CASE 
      WHEN type IN ('deposit') THEN amount
      WHEN type IN ('withdrawal', 'order') THEN -amount
      WHEN type = 'refund' THEN amount
      ELSE 0
    END
  ), 0) INTO v_balance
  FROM public.transactions
  WHERE user_id = p_user_id;
  
  RETURN COALESCE(v_balance, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- View for user balance (easier to query)
CREATE OR REPLACE VIEW public.user_balance AS
SELECT 
  id as user_id,
  public.get_user_balance(id) as balance
FROM public.profiles;

-- Grant permissions
GRANT SELECT ON public.coupons TO anon, authenticated;
GRANT ALL ON public.coupons TO authenticated;
GRANT ALL ON public.user_coupons TO authenticated;
GRANT SELECT ON public.user_balance TO authenticated;
