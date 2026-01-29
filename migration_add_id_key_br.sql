ALTER TABLE public.takes_place_in_br
ADD COLUMN id SERIAL;

ALTER TABLE public.takes_place_in_br
DROP CONSTRAINT takes_place_in_br_pkey;

ALTER TABLE public.takes_place_in_br
ADD CONSTRAINT takes_place_in_br_pkey PRIMARY KEY (id);
