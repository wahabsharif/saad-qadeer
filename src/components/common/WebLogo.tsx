import logoIcon from "@/assets/logo/saad-qadeer-logo-icon.svg";
import Image from "next/image";
import Link from "next/link";

function WebLogo() {
  return (
    <div className="fixed top-2 left-2 p-4 z-50 bg-black/50 backdrop-blur-md rounded-xl">
      <Link href={"/"}>
        <Image
          src={logoIcon}
          alt="saad-qadeer-logo"
          width={500}
          height={500}
          className="w-8 sm:w-8 md:w-8 lg:w-12 transition-transform duration-300 ease-in-out hover:scale-125"
        />
      </Link>
    </div>
  );
}

export default WebLogo;
