import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      port: '',
    }
    ]
  }
};

export default nextConfig;
