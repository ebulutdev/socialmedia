-- Insert Coupons with Sophier Links
-- Run this SQL in your Supabase SQL Editor
-- Make sure COUPON_SCHEMA.sql is run first!

-- 1₺ Test Kuponu
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (1, 'https://www.shopier.com/subjectivemedia/43568548', true)
ON CONFLICT (value) DO UPDATE SET sophier_link = EXCLUDED.sophier_link, is_active = EXCLUDED.is_active;

-- 250₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (250, 'https://www.shopier.com/subjectivemedia/43528547', true)
ON CONFLICT (value) DO UPDATE SET sophier_link = EXCLUDED.sophier_link, is_active = EXCLUDED.is_active;

-- 350₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (350, 'https://www.shopier.com/subjectivemedia/43528996', true)
ON CONFLICT (value) DO UPDATE SET sophier_link = EXCLUDED.sophier_link, is_active = EXCLUDED.is_active;

-- 500₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (500, 'https://www.shopier.com/subjectivemedia/43529041', true)
ON CONFLICT (value) DO UPDATE SET sophier_link = EXCLUDED.sophier_link, is_active = EXCLUDED.is_active;

-- 750₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (750, 'https://www.shopier.com/subjectivemedia/43529075', true)
ON CONFLICT (value) DO UPDATE SET sophier_link = EXCLUDED.sophier_link, is_active = EXCLUDED.is_active;

-- 1000₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (1000, 'https://www.shopier.com/subjectivemedia/43529113', true)
ON CONFLICT (value) DO UPDATE SET sophier_link = EXCLUDED.sophier_link, is_active = EXCLUDED.is_active;

-- Verify inserted coupons
SELECT id, value, sophier_link, is_active, created_at 
FROM public.coupons 
ORDER BY value ASC;
