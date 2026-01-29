-- Ajouter la colonne description à la table tournament
ALTER TABLE public.tournament
ADD COLUMN description text DEFAULT '';