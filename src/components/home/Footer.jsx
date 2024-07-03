import { Facebook, Linkedin, MapPin, Phone, X } from "lucide-react";
import React from "react";
import { FaGoogle, FaPinterest, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-100 pt-[7rem] pb-[3rem] ">
      <div className="contenedor">
        <div className="flex justify-between border-b border-gray-300 pb-[2rem] md:flex-col md:gap-[2rem] md:items-center ">
          <img
            src="https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/logo.svg"
            alt="Logo"
          />

          <div className="flex gap-[2rem] items-center">
            <p className="text-[1.4rem] sm:hidden font-bold">Follow us:</p>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <Facebook />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <FaTwitter />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <Linkedin />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <FaPinterest />
            </div>
            <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-white ">
              <FaGoogle />
            </div>
          </div>
        </div>
        <nav className="grid mt-[3rem] grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-[2rem] sm:grid-cols-1  md:justify-items-start sm:justify-items-center md:items-center ">
          <div className="md:flex md:flex-col md:items-center">
            <div className="flex  gap-[2rem] items-center">
              <Phone className="text-primary w-[4rem] h-[4rem] " />
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
              <MapPin className="text-customGray" />
              118 E 128th St, East Chicago, IN 46312, US
            </p>
          </div>

          <div className="sm:hidden">
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
          <div className="sm:hidden">
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
          <div className="sm:hidden">
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
          <div className="sm:hidden">
            <p className="font-bold">Download App</p>
            <div className="flex mt-[2rem] flex-col gap-[1rem] ">
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                <img
                  src="https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/google-play.png"
                  alt="Icon PlayStore"
                />
              </Link>
              <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                <img
                  src="https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/app-store.png"
                  alt="Icon AppStore"
                />
              </Link>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 gap-[2rem] hidden sm:block">
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
                    src="https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/google-play.png"
                    alt="Icon PlayStore"
                  />
                </Link>
                <Link className="text-[1.4rem] text-customGray hover:text-primary transition-all duration-300">
                  <img
                    src="https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/app-store.png"
                    alt="Icon AppStore"
                  />
                </Link>
              </div>
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
