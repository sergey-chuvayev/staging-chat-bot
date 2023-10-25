import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://prjgtilyqvzgmgjuzouy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByamd0aWx5cXZ6Z21nanV6b3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3ODIzNjEsImV4cCI6MjAxMDM1ODM2MX0.uj6jqrD8hI-TCx59Z90ua5GOFKGq1vQzko_ysZHzgGA"
);
