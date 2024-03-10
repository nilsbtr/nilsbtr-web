import { FaGithub, FaInstagram, FaSpotify } from "react-icons/fa6";

const socialLinks = [
  {
    title: "Instagram",
    path: "https://www.instagram.com/nilsbttr",
    icon: <FaInstagram className="size-10" />,
  },
  {
    title: "Spotify",
    path: "https://open.spotify.com/user/0hxq229m6k3sbxi4q4mjk3n91?si=0aj7uszgQR66xZCpLLjImQ",
    icon: <FaSpotify className="size-10" />,
  },
  {
    title: "GitHub",
    path: "https://github.com/nilsbtr",
    icon: <FaGithub className="size-10" />,
  },
];

const Socials = () => {
  return (
    <div className="mt-3 rounded-lg border-2 border-border text-foreground lg:w-2/5">
      <div className="rounded-t-lg p-3">
        <h1 className="text-xl font-semibold">My Socials</h1>
      </div>
      <div className="rounded-b-lg p-3">
        <ul className="">
          {socialLinks.map(({ title, path, icon }) => (
            <li
              key={title}
              className="mb-2 last:mb-0 p-2 rounded-lg border-2 border-border hover:border-accent"
            >
              <a href={path} className="flex items-center gap-4">
                {icon}
                <p>{title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Socials;
