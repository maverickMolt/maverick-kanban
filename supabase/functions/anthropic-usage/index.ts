import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const adminKey = req.headers.get("x-admin-key");
    if (!adminKey || !adminKey.startsWith("sk-ant-admin")) {
      return new Response(JSON.stringify({ error: "Invalid admin key" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const startingAt = url.searchParams.get("starting_at") || 
      String(Math.floor((Date.now() - 30 * 86400000) / 1000));

    const anthropicRes = await fetch(
      `https://api.anthropic.com/v1/organizations/usage_report/messages?starting_at=${startingAt}`,
      {
        headers: {
          "x-api-key": adminKey,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    const data = await anthropicRes.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
