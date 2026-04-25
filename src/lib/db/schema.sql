-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    gender TEXT,
    age INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_slug TEXT NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('paid', 'pending', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workbook Progress table
CREATE TABLE IF NOT EXISTS workbook_progress (
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_slug TEXT NOT NULL,
    completed_pages JSONB DEFAULT '[]'::JSONB,
    current_page_id TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (customer_id, product_slug)
);

-- Workbook Answers table
CREATE TABLE IF NOT EXISTS workbook_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_slug TEXT NOT NULL,
    page_id TEXT NOT NULL,
    prompt_id TEXT NOT NULL,
    answer TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (customer_id, product_slug, page_id, prompt_id)
);
