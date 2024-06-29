import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-100 pt-[7rem] pb-[3rem] ">
      <div className="contenedor">
        <div className="flex justify-between border-b border-gray-300 pb-[2rem] md:flex-col md:gap-[2rem] md:items-center ">
          <img src="../../public/images/logo_black.svg" alt="Logo" />

          <div className="flex gap-[2rem] items-center">
            <p className="text-[1.4rem] font-bold">Follow us:</p>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <img
                className="w-[2rem] group-hover:filter group-hover:invert transition-all duration-300 h-[2rem] "
                src="../../public/icons/icon_facebook.png"
                alt="Icon Social"
              />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <img
                className="w-[2rem] group-hover:filter group-hover:invert transition-all duration-300 h-[2rem] "
                src="../../public/icons/icon_twitter.png"
                alt="Icon Social"
              />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <img
                className="w-[2rem] group-hover:filter group-hover:invert transition-all duration-300 h-[2rem] "
                src="../../public/icons/icon_linkedin.png"
                alt="Icon Social"
              />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <img
                className="w-[2rem] group-hover:filter group-hover:invert transition-all duration-300 h-[2rem] "
                src="../../public/icons/icon_pinterest.png"
                alt="Icon Social"
              />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <img
                className="w-[2rem] group-hover:filter group-hover:invert transition-all duration-300 h-[2rem] "
                src="../../public/icons/icon_google.png"
                alt="Icon Social"
              />
            </div>
          </div>
        </div>
        <nav className="grid mt-[3rem] grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-[2rem] sm:grid-cols-2   md:justify-items-center md:items-center ">
          <div className="md:flex md:flex-col md:items-center">
            <div className="flex  gap-[2rem] items-center">
              <img
                className="w-[4rem] h-[4rem] "
                src="../../public/icons/icon_phone.png"
                alt="Icon Phone"
              />
              <div>
                <span className="text-customGray text-[1.4rem] ">
                  Need Help? 24/7
                </span>
                <h3 className="font-bold">001-1234-8888</h3>
              </div>
            </div>
            <p className="text-customGray md:text-center text-[1.4rem] ">
              Job Searching Just Got Easy. Use Jobtex to run a hiring site and
              earn money in the process!
            </p>
            <p className="text-[1.4rem] mt-[1rem] flex gap-[1rem] items-center ">
              {" "}
              <img
                className="w-[2rem] h-[2rem] "
                src="../../public/icons/icon_ubicacion_black.png"
                alt="Logo Ubicacion"
              />{" "}
              118 E 128th St, East Chicago, IN 46312, US
            </p>
          </div>
          <div>
            <p className="font-bold">Quick Links</p>
            <div className="flex mt-[2rem] flex-col gap-[1rem] ">
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Job Listing
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Candidates
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Employers
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Login
              </Link>
            </div>
          </div>
          <div>
            <p className="font-bold">For Candidates</p>
            <div className="flex mt-[2rem] flex-col gap-[1rem] ">
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Job Listing
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Candidates
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Employers
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Login
              </Link>
            </div>
          </div>
          <div>
            <p className="font-bold">For Employers</p>
            <div className="flex mt-[2rem] flex-col gap-[1rem] ">
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Job Listing
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Candidates
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Employers
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                Login
              </Link>
            </div>
          </div>
          <div>
            <p className="font-bold">Download App</p>
            <div className="flex mt-[2rem] flex-col gap-[1rem] ">
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                <img
                  src="../../public/icons/icon_playstore.png"
                  alt="Icon PlayStore"
                />
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                <img
                  src="../../public/icons/icon_appstore.png"
                  alt="Icon AppStore"
                />
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex justify-between items-center  pt-[2rem] mt-[4rem] border-t  border-gray-300 ">
          <p className="text-[1.4rem] text-customGray">
            © 2024 Jobtex. All Rights Reserved.{" "}
          </p>
          <div className="flex gap-[2rem] items-center">
            <Link className="text-[1.4rem] hover:text-primary text-customGray transition-all duration-300 ">
              Terms Of Services
            </Link>
            <Link className="text-[1.4rem] hover:text-primary text-customGray transition-all duration-300 ">
              Privacy Policy
            </Link>
            <Link className="text-[1.4rem] hover:text-primary text-customGray transition-all duration-300 ">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
