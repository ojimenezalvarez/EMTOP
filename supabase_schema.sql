-- Esquema de base de datos para EMTOP Store Latacunga
-- Copia y pega esto en el Editor SQL de Supabase

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  originalPrice DECIMAL,
  priceType TEXT NOT NULL,
  imageUrl TEXT,
  isBestSeller BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Campañas
CREATE TABLE IF NOT EXISTS campañas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  discountText TEXT,
  accentColor TEXT,
  isActive BOOLEAN DEFAULT false,
  imageUrl TEXT,
  videoUrl TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Configuración del Sitio
CREATE TABLE IF NOT EXISTS configuracion_sitio (
  id INTEGER PRIMARY KEY DEFAULT 1,
  topPromoText TEXT,
  heroBadge TEXT,
  stats JSONB,
  footerDesc TEXT,
  newsletterTitle TEXT,
  newsletterDesc TEXT,
  phone TEXT,
  address TEXT,
  developer TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar configuración inicial si no existe
INSERT INTO configuracion_sitio (id, topPromoText, heroBadge, stats, footerDesc, newsletterTitle, newsletterDesc, phone, developer)
VALUES (1, 'ENVÍOS A TODO EL PAÍS - CALIDAD INDUSTRIAL GARANTIZADA', 'DISTRIBUIDOR AUTORIZADO', '[{"num": "15+", "label": "AÑOS DE EXPERIENCIA"}, {"num": "500+", "label": "HERRAMIENTAS"}, {"num": "100%", "label": "GARANTÍA"}, {"num": "24/7", "label": "SOPORTE"}]', 'Líderes en herramientas industriales en Latacunga.', 'ÚNETE AL CLUB EMTOP', 'Recibe ofertas exclusivas y lanzamientos.', '+593 999 999 999', 'Desarrollado por EMTOP Tech')
ON CONFLICT (id) DO NOTHING;
