/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/r/statsfm",
        destination: "https://stats.fm/nilsbtr",
        permanent: false,
      },
      {
        source: "/r/sunflowers",
        destination: "https://discord.gg/7UjGrd9Qhb",
        permanent: false,
      },
      {
        source: "/r/hoerbuecher",
        destination: "https://nilsbtr.notion.site/H-rb-cher-9b1f893c85cd498ebd8a7386ac76a6fb?pvs=4",
        "permanent": false,
      }
      {
        source: "/r/raidreport",
        destination: "https://raid.report/pc/4611686018485820917",
        permanent: false,
      },
      {
        source: "/r/dungeonreport",
        destination: "https://dungeon.report/pc/4611686018485820917",
        permanent: false,
      },
      {
        source: "/r/nightfall",
        destination: "https://nightfall.report/guardian/3/4611686018485820917",
        permanent: false,
      },
      {
        source: "/r/guardianreport",
        destination:
          "https://guardian.report/?view=RAIDS&guardians=4611686018485820917",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
