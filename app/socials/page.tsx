import {
  faGithub,
  faInstagram,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socials = {
  instagram: "https://www.instagram.com/nilsbttr",
  spotify:
    "https://open.spotify.com/user/0hxq229m6k3sbxi4q4mjk3n91?si=0aj7uszgQR66xZCpLLjImQ",
  github: "https://github.com/nilsbtr",
};

export default function Socials() {
  return (
    <main className="mt-3 rounded-lg border-2 border-content/30 text-content lg:w-2/5">
      <div className="bg-component rounded-t-lg p-3">
        <h1 className="text-xl font-semibold">My Socials</h1>
      </div>
      <div className="bg-background rounded-b-lg p-3">
        <ul>
          <li className="bg-component mb-2 p-2 rounded-lg border-2 border-component hover:border-accent">
            <a href={socials.instagram} className="flex items-center gap-4">
              <FontAwesomeIcon icon={faInstagram} className="size-10" />
              <p>Instagram</p>
            </a>
          </li>
          <li className="bg-component mb-2 p-2 rounded-lg border-2 border-component hover:border-accent">
            <a href={socials.spotify} className="flex items-center gap-4">
              <FontAwesomeIcon icon={faSpotify} className="size-10" />
              <p>Spotify</p>
            </a>
          </li>
          <li className="bg-component p-2 rounded-lg border-2 border-component hover:border-accent">
            <a href={socials.github} className="flex items-center gap-4">
              <FontAwesomeIcon icon={faGithub} className="size-10" />
              <p>GitHub</p>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
