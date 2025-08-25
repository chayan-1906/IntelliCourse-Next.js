import Vapi from "@vapi-ai/web";

// don't use config's NEXT_PUBLIC_VAPI_WEB_TOKEN
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || '');

export {vapi};
