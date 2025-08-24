import Vapi from "@vapi-ai/web";
import {NEXT_PUBLIC_VAPI_WEB_TOKEN} from "@/config/config";

const vapi = new Vapi(NEXT_PUBLIC_VAPI_WEB_TOKEN || '');

export {vapi};
