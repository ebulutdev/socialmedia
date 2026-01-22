-- Update Schema for Saved Carts
-- Run this SQL in your Supabase SQL Editor if you already have the base schema

-- Saved Carts Table
CREATE TABLE IF NOT EXISTS public.saved_carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_price DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.saved_carts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Saved Carts
DROP POLICY IF EXISTS "Users can view own saved carts" ON public.saved_carts;
CREATE POLICY "Users can view own saved carts"
  ON public.saved_carts FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own saved carts" ON public.saved_carts;
CREATE POLICY "Users can create own saved carts"
  ON public.saved_carts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own saved carts" ON public.saved_carts;
CREATE POLICY "Users can update own saved carts"
  ON public.saved_carts FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own saved carts" ON public.saved_carts;
CREATE POLICY "Users can delete own saved carts"
  ON public.saved_carts FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_saved_carts_updated_at ON public.saved_carts;
CREATE TRIGGER update_saved_carts_updated_at
  BEFORE UPDATE ON public.saved_carts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_saved_carts_user_id ON public.saved_carts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_carts_updated_at ON public.saved_carts(updated_at DESC);

-- Grant permissions
GRANT ALL ON public.saved_carts TO authenticated;
