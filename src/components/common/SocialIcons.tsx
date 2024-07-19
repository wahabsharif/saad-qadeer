import Link from "next/link";
import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialIcons = () => {
  return (
    <aside className="fixed z-50 w-10 top-1/2 right-2 transform -translate-y-1/2 backdrop-blur-sm bg-white/30 border border-yellow rounded-full">
      <div className="flex flex-col items-center justify-center h-full space-y-2">
        <div className="relative group">
          <Link
            target="_blank"
            href={"/"}
            className="relative z-10 inline-flex flex-col items-center justify-center p-2"
          >
            <FaFacebook className="text-gray-600 text-2xl font-bold dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-300" />
          </Link>
        </div>

        <div className="relative group">
          <Link
            target="_blank"
            href={"/about"}
            className="relative z-10 inline-flex flex-col items-center justify-center p-2"
          >
            <FaInstagram className="text-gray-600 text-2xl font-bold dark:text-gray-300 group-hover:text-green-500 dark:group-hover:text-green-300" />
          </Link>
        </div>

        <div className="relative group">
          <Link
            target="_blank"
            href={"/portfolio"}
            className="relative z-10 inline-flex flex-col items-center justify-center p-2"
          >
            <FaLinkedinIn className="text-gray-600 text-2xl font-bold dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-purple-300" />
          </Link>
        </div>

        <div className="relative group">
          <Link
            target="_blank"
            href={"/contact"}
            className="relative z-10 inline-flex flex-col items-center justify-center p-2"
          >
            <FaBehance className="text-gray-600 text-2xl font-bold dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-300" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SocialIcons;
