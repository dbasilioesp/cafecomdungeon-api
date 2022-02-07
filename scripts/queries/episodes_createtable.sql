CREATE TABLE public.Episodes (
  images json NULL,
  uri text NULL,
  release_date date NULL,
  href text NULL,
  duration_ms integer NULL,
  audio_preview_url text NULL,
  html_description text NULL,
  description text NULL,
  name text NULL,
  id text NULL,
  internal_id integer NOT NULL
);

ALTER TABLE public.Episodes
ADD CONSTRAINT episodes_pkey PRIMARY KEY (internal_id)