/*
====================================================
EasyQuote Core Schema v2
Clean Supabase Database
====================================================

Architecture:
Contractor
    |
    |
Projects
    |
    |
Estimates
    |
    |
Estimate Items
    |
    |
Invoices

Authentication:
Custom session handled by application.
Supabase is database only.

====================================================
*/


CREATE EXTENSION IF NOT EXISTS "pgcrypto";


/*
====================================================
CONTRACTORS
====================================================
*/

CREATE TABLE IF NOT EXISTS contractors (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    email text UNIQUE NOT NULL,

    company_name text,

    phone text,

    address text,

    license text,

    website text,

    logo_url text,

    membership_plan integer DEFAULT 8,

    created_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS contractors_email_idx
ON contractors(email);



/*
====================================================
ESTIMATE USAGE
Tracks free plan usage
====================================================
*/

CREATE TABLE IF NOT EXISTS estimate_usage (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    email text UNIQUE NOT NULL,

    free_estimate_used boolean DEFAULT false,

    estimate_count integer DEFAULT 0,

    last_estimate_date timestamptz,

    created_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS estimate_usage_email_idx
ON estimate_usage(email);



/*
====================================================
CLIENTS
====================================================
*/

CREATE TABLE IF NOT EXISTS clients (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    contractor_email text NOT NULL,

    name text,

    email text,

    phone text,

    address text,

    created_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS clients_contractor_email_idx
ON clients(contractor_email);



/*
====================================================
PROJECTS
====================================================
*/

CREATE TABLE IF NOT EXISTS projects (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    contractor_email text NOT NULL,

    client_id uuid REFERENCES clients(id)
    ON DELETE SET NULL,

    project_name text,

    project_type text,

    status text DEFAULT 'draft',

    estimate_total numeric(12,2) DEFAULT 0,

    project_data_json jsonb DEFAULT '{}'::jsonb,

    created_at timestamptz DEFAULT now(),

    updated_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS projects_contractor_email_idx
ON projects(contractor_email);


CREATE INDEX IF NOT EXISTS projects_client_id_idx
ON projects(client_id);



/*
====================================================
ESTIMATES
====================================================
*/

CREATE TABLE IF NOT EXISTS estimates (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id uuid NOT NULL REFERENCES projects(id)
    ON DELETE CASCADE,

    subtotal numeric(12,2) DEFAULT 0,

    tax numeric(12,2) DEFAULT 0,

    markup numeric(12,2) DEFAULT 0,

    grand_total numeric(12,2) DEFAULT 0,

    estimate_data_json jsonb DEFAULT '{}'::jsonb,

    created_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS estimates_project_id_idx
ON estimates(project_id);



/*
====================================================
ESTIMATE ITEMS
====================================================
*/

CREATE TABLE IF NOT EXISTS estimate_items (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    estimate_id uuid NOT NULL REFERENCES estimates(id)
    ON DELETE CASCADE,

    item_name text NOT NULL,

    description text,

    quantity numeric(12,2) DEFAULT 1,

    unit text,

    cost numeric(12,2) DEFAULT 0,

    price numeric(12,2) DEFAULT 0,

    total numeric(12,2) DEFAULT 0,

    sort_order integer DEFAULT 0,

    created_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS estimate_items_estimate_id_idx
ON estimate_items(estimate_id);



/*
====================================================
INVOICES
====================================================
*/

CREATE TABLE IF NOT EXISTS invoices (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id uuid NOT NULL REFERENCES projects(id)
    ON DELETE CASCADE,

    invoice_number text NOT NULL,

    status text DEFAULT 'draft',

    invoice_total numeric(12,2) DEFAULT 0,

    invoice_data_json jsonb DEFAULT '{}'::jsonb,

    created_at timestamptz DEFAULT now()

);


CREATE INDEX IF NOT EXISTS invoices_project_id_idx
ON invoices(project_id);



/*
====================================================
UPDATED TIMESTAMP TRIGGER
====================================================
*/

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$

BEGIN

    NEW.updated_at = now();

    RETURN NEW;

END;

$$ LANGUAGE plpgsql;



DROP TRIGGER IF EXISTS projects_updated_trigger
ON projects;


CREATE TRIGGER projects_updated_trigger

BEFORE UPDATE ON projects

FOR EACH ROW

EXECUTE FUNCTION update_updated_at();



/*
====================================================
RLS ENABLE
====================================================
*/

ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;

ALTER TABLE estimate_usage ENABLE ROW LEVEL SECURITY;

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;

ALTER TABLE estimate_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;



/*
====================================================
OPEN POLICIES
Application controls ownership
====================================================
*/


CREATE POLICY contractors_access
ON contractors
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);



CREATE POLICY estimate_usage_access
ON estimate_usage
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);



CREATE POLICY clients_access
ON clients
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);



CREATE POLICY projects_access
ON projects
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);



CREATE POLICY estimates_access
ON estimates
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);



CREATE POLICY estimate_items_access
ON estimate_items
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);



CREATE POLICY invoices_access
ON invoices
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);
