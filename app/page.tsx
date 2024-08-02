import LinkedButton from "@/components/LinkedButton";

import { FaChartLine, FaGithub, FaInstagram, FaSpotify } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="w-full md:w-2/5 max-w-[358.4px] grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1 md:col-span-2">
          <LinkedButton
            link="https://www.instagram.com/nilsbttr"
            icon={<FaInstagram />}
            text="Instagram"
          />
        </div>
        <div>
          <LinkedButton
            link="https://open.spotify.com/user/0hxq229m6k3sbxi4q4mjk3n91?si=0aj7uszgQR66xZCpLLjImQ"
            icon={<FaSpotify />}
            text="Spotify"
          />
        </div>
        <div>
          <LinkedButton
            link="https://stats.fm/nilsbtr"
            icon={<FaChartLine />}
            text="stats.fm"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <LinkedButton
            link="https://github.com/nilsbtr"
            icon={<FaGithub />}
            text="GitHub"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
