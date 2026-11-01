import { createClient } from
'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL =
'https://zvousarubsyosygkperm.supabase.co';

const SUPABASE_KEY =
'sb_publishable_95JNm4Kk1dlQnUR7N0D_9A_Wby2MlET';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
