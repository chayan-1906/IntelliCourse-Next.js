import {createClient} from "@supabase/supabase-js";
import {NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL} from "@/config/config";
import {auth} from "@clerk/nextjs/server";

const createSupabaseClient = () => {
	return createClient(
		NEXT_PUBLIC_SUPABASE_URL || '',
		NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
		{
			async accessToken() {
				return (await auth()).getToken();
			},
		},
	);
}

export {createSupabaseClient};
