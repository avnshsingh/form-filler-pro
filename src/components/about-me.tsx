import {
  CircleUserRound,
  Github,
  Link,
  Linkedin,
  MailPlus,
  X,
} from "lucide-react";

const AboutMe = () => {
  return (
    <div>
      <h2 className="text-lg font-medium text-center pb-2 text-orange-950">
        Check me out!
      </h2>
      <div className="grid grid-cols-2 place-items-center gap-2">
        <a
          href="https://www.avinashs.in/"
          target="_blank"
          className="flex gap-1 items-center border-2 border-orange-400 rounded-md p-1 hover:bg-orange-200 text-orange-800"
        >
          <CircleUserRound size={20} strokeWidth={1} />
          Portfolio
        </a>
        <a
          href="https://www.avinashs.in/posts/"
          className="flex gap-1 items-center border-2 border-orange-400 rounded-md p-1 hover:bg-orange-200 text-orange-800 px-3"
          target="_blank"
        >
          <Link size={20} strokeWidth={1} />
          Blog
        </a>
        <a
          href="https://www.linkedin.com/in/avnshsingh/"
          className="flex gap-1 items-center border-2 border-orange-400 rounded-md p-1 hover:bg-orange-200 text-orange-800"
          target="_blank"
        >
          <Linkedin size={20} strokeWidth={1} />
          Linkedin
        </a>
        <a
          href="https://x.com/avnshSingh"
          className="flex gap-1 items-center border-2 border-orange-400 rounded-md p-1 hover:bg-orange-200 text-orange-800"
          target="_blank"
        >
          <X size={20} strokeWidth={1} />
          Twitter
        </a>
        <a
          href="https://github.com/avnshsingh"
          className="flex gap-1 items-center border-2 border-orange-400 rounded-md p-1 hover:bg-orange-200 text-orange-800 px-2"
          target="_blank"
        >
          <Github size={20} strokeWidth={1} />
          Github
        </a>
        <a
          href="mailto:avinashsingh888555@gmail.com"
          className="flex gap-1 items-center border-2 border-orange-400 rounded-md p-1 hover:bg-orange-200 text-orange-800 px-2"
        >
          <MailPlus size={20} strokeWidth={1} />
          Email
        </a>
      </div>
    </div>
  );
};

export default AboutMe;
