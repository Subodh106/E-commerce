import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
      remotePatterns:[
        {
          protocol:"https",
          hostname:"media.wired.com"
        },{
          protocol:"https",
          hostname:"i.dell.com"
        }
      ]
  }
};

export default nextConfig;
