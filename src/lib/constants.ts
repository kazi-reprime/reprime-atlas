export const SITE_NAME = "RePrime Atlas";
export const SITE_URL = "https://reprime-atlas.vercel.app";
export const REPRIME_DATA_PLATFORM_URL = "https://reprime-data-platform.vercel.app";
export const REPRIME_API_BASE = process.env.REPRIME_API_BASE ?? REPRIME_DATA_PLATFORM_URL;

export const PALETTE = {
  paper: "#FAFAF7",
  ink: "#0B1220",
  navy: "#0F1E3D",
  navyDeep: "#091533",
  navySoft: "#1E3360",
  orange: "#E8763A",
  orangeSoft: "#F4A574",
  gold: "#D4AF37",
  goldSoft: "#E8D58A",
  slate100: "#F1F5F9",
  slate500: "#64748B",
  slate700: "#334155",
  border: "#E5E7EB",
  emerald: "#6EE7B7",
  rose: "#FDA4AF",
} as const;
