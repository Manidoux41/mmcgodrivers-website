-- À exécuter dans l'éditeur SQL de votre projet Supabase
-- (https://supabase.com → votre projet → SQL Editor)

CREATE TABLE IF NOT EXISTS commentaires (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nom        TEXT        NOT NULL,
  email      TEXT,
  message    TEXT        NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 1000),
  note       INTEGER     NOT NULL CHECK (note >= 1 AND note <= 5),
  statut     TEXT        NOT NULL DEFAULT 'en_attente'
                         CHECK (statut IN ('en_attente', 'approuve', 'rejete')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour accélérer le filtre par statut
CREATE INDEX IF NOT EXISTS idx_commentaires_statut ON commentaires(statut);

-- Désactive RLS (la sécurité est gérée côté application via le cookie admin)
ALTER TABLE commentaires DISABLE ROW LEVEL SECURITY;
