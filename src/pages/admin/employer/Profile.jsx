import React, { useEffect, useState } from "react";
import Map from "../../../components/Map";
import axios from "axios";
import useJobtex from "../../../hooks/useJobtex";
import { toast } from "react-hot-toast";
import useAuthEmployer from "../../../hooks/useAuthEmployer";

function Profile() {
  const { authEmployer, tokenE } = useAuthEmployer();

  const [networksNumber, setNetworksNumber] = useState(0);

  const [file, setFile] = useState(); //photo
  const [imageURL, setImageURL] = useState(""); //URL Image
  const [fullName, setFullname] = useState(""); //fullname
  const [number, setNumber] = useState(0); //number
  const [foundedDate, setFoundedDate] = useState(0); //founder date
  const [companySize, setCompanySize] = useState(0);
  const [categorieId, setCategorieId] = useState("");
  const [website, setWebsite] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [address, setAddress] = useState("");
  const [locationId, setLocationId] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [videoURL, setVideoURL] = useState("");
  const [emailId, setEmailId] = useState("");
  const [imageReplace, setImageReplace] = useState("");

  const [cargando, setCargando] = useState(true);

  const [networksArray, setNetworksArray] = useState([
    { social_id: "", url: "" },
    { social_id: "", url: "" },
    { social_id: "", url: "" },
    { social_id: "", url: "" },
    { social_id: "", url: "" },
  ]);

  //Llenar los campos...
  async function getProfile() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenE}`,
      },
    };

    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/employers/get-profile/${
        authEmployer._id
      }`,
      config
    );

    //Set Normal Data
    setFullname(data.fullname);
    setNumber(data.number);
    setEmailId(data.email);
    setFoundedDate(data.founded);
    setCategorieId(data.categorie_id);
    setAboutMe(data.aboutme);
    setAddress(data.address);
    setVideoURL(data.video);
    setLocationId(data.location_id);
    setWebsite(data.website);
    setLatitude(data.lat);
    setLongitude(data.long);
    setImageURL(data.photo);
    setImageReplace(data.photo);
    setCompanySize(data.size);

    //Set the array,
    ///get-candidate-networks/:id
    const candidateNet = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/network/get-employer-networks/${
        authEmployer._id
      }`
    );

    if (candidateNet.data.length > 0) {
      setNetworksNumber(candidateNet.data.length);
      setNetworksArray(candidateNet.data);
    }

    setCargando(false);

    console.log(data);
  }

  useEffect(() => {
    getProfile();
  }, []);

  function handleSelectSocial(index, e) {
    setNetworksArray((prevState) => {
      const updatedNetworksArray = [...prevState];
      updatedNetworksArray[index] = {
        ...updatedNetworksArray[index],
        social_id: e.target.value,
      };
      console.log(updatedNetworksArray);
      return updatedNetworksArray;
    });
  }

  function handleInputSocial(index, e) {
    setNetworksArray((prevState) => {
      const updatedNetworksArray = [...prevState];
      updatedNetworksArray[index] = {
        ...updatedNetworksArray[index],
        url: e.target.value,
      };
      console.log(updatedNetworksArray);
      return updatedNetworksArray;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      [
        file,
        fullName,
        number,
        categorieId,
        foundedDate,
        companySize,
        website,
        address,
        locationId,
        longitude,
        latitude,
        videoURL,
        emailId,
        aboutme,
      ].includes("")
    ) {
      return toast.error("All Fields are Required");
    }

    if (file === undefined && imageURL === "") {
      return toast.error("Image Not Loaded");
    }

    let networksIncomplete = false;

    networksArray.forEach((net) => {
      if (networksNumber >= 1 && (!net.social_id || !net.url)) {
        networksIncomplete = true;
      }
    });

    try {
      console.log("Imagen: " + imageURL);
      if (!imageURL || imageURL !== imageReplace) {
        console.log("Imagen Creada");
        //Guardar Imagen.
        const formdata = new FormData();
        formdata.append("file", file);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/foreign/upload`,
          formdata
        );

        setImageURL(res.data);
        console.log(imageURL);
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenE}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employers/update-profile/${
          authEmployer._id
        }`,
        {
          photo: imageURL,
          fullname: fullName,
          number,
          founded: foundedDate,
          categorie_id: categorieId,
          size: companySize,
          website,
          aboutme,
          address,
          location_id: locationId,
          long: longitude,
          lat: latitude,
          video: videoURL,
          email: emailId,
        },
        config
      );

      if (networksNumber >= 1) {
        networksArray.forEach(async (net, index) => {

          if(index > networksNumber - 1){
            return toast.success("Profile Successfully Updated");
          }

          const networkExist = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/network/get-network-employer`,
            {
              params: {
                social_id: net.social_id,
                employer_id: authEmployer._id,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenE}`,
              },
            }
          );

          if (networkExist.data.length > 0) {
            console.log("Actualizando...");

            const { data } = await axios.put(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/api/network/update-network-emp/${networkExist.data[0]._id}`,
              {
                url: net.url, // Include the updated data in the request body
              },
              config
            );
            console.log(data);
          } else {
            console.log("Creando...");

            const { data } = await axios.post(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/api/network/create-network-employer`,
              {
                social_id: net.social_id,
                url: net.url,
                employer_id: authEmployer._id,
              },
              config
            );
            console.log(data);
          }
        });
      }

      console.log(data);
    } catch (error) {
      return toast.error(error.message);
    }

    toast.success("Profile Successfully Updated");
    //getProfile();
    window.scrollTo(0, 0);
  }

  const { categories, locations, charging, socials } = useJobtex();

  return (
    <main className="mb-[5rem] ">
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Profile
      </h2>

      <div className="bg-white p-[3rem]">
        <h3 className="font-bold">General</h3>

        <form onSubmit={handleSubmit}>
          <div className="border-b pb-[4rem] mb-[2rem] border-b-gray-300 ">
            <p
              className="font-semibold mb-[2rem] text-[1.4rem] "
              htmlFor="image"
            >
              Logo Image
            </p>

            <img
              className="mb-[2rem] w-[15rem] h-[15rem] "
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${imageURL}`}
              alt="Upload Your Image"
            />
            <label
              className="py-[1rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
              htmlFor="image"
            >
              Browse
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                setImageReplace(e.target.files[0].name);
              }}
              name="photo"
              className="hidden"
              type="file"
              id="image"
            />
          </div>

          <h3 className="font-bold">Information</h3>

          <div className="grid grid-cols-2 gap-[3rem] border-b pb-[4rem] border-b-gray-300">
            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="fullname"
              >
                Employer Name
              </label>
              <input
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                value={fullName}
                placeholder="Your Full Name"
                id="fullname"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="number"
              >
                Phone Number
              </label>
              <input
                onChange={(e) => {
                  setNumber(Number(e.target.value));
                }}
                value={number}
                id="number"
                placeholder="Enter Your Phone Number"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                value={emailId}
                placeholder="Enter Your Email"
                id="email"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="email"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="experience"
              >
                Founded Date
              </label>
              <input
                onChange={(e) => {
                  setFoundedDate(Number(e.target.value));
                }}
                value={foundedDate}
                id="experience"
                placeholder="Enter Your Years Of Experience"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="experience"
              >
                Company Size
              </label>
              <input
                onChange={(e) => {
                  setCompanySize(Number(e.target.value));
                }}
                value={companySize}
                id="experience"
                placeholder="Enter Your Years Of Experience"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Categorie
              </label>
              <select
                onChange={(e) => {
                  setCategorieId(e.target.value);
                }}
                value={categorieId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Categorie--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Categorie--
                    </option>
                    {categories.map((cate) => (
                      <option key={cate._id} value={cate._id}>
                        {cate.categorie}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="jobtitle"
              >
                Website
              </label>
              <input
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
                value={website}
                placeholder="Your Job Title"
                id="jobtitle"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>
          </div>

          <div className="mt-[2rem] border-b pb-[4rem] border-b-gray-300">
            <h3 className="font-bold">About Company</h3>
            <textarea
              onChange={(e) => {
                setAboutMe(e.target.value);
              }}
              value={aboutme}
              placeholder="Give a resume about you"
              className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="mt-[2rem] border-b pb-[4rem] border-b-gray-300">
            <h3 className="font-bold">Social Network</h3>

            {Array.from({ length: networksNumber }, (_, index) => (
              <div key={index}>
                <details className="bg-gray-100 mt-[2rem] w-full py-[1.3rem] px-[2rem]  rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white">
                  <summary>Network {index + 1} </summary>
                  <div>
                    <div className="flex gap-[5rem] mt-[2rem] items-center">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="network"
                      >
                        Network
                      </label>
                      <select
                        value={networksArray[index].social_id}
                        onChange={(e) => {
                          handleSelectSocial(index, e);
                        }}
                        className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        id="language"
                      >
                        {charging ? (
                          <option disabled selected value="">
                            --Select Network--
                          </option>
                        ) : (
                          <>
                            <option disabled selected value="">
                              --Select Network--
                            </option>
                            {socials.map((social) => (
                              <option key={social._id} value={social._id}>
                                {social.social_name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <input
                        value={networksArray[index].url}
                        onChange={(e) => {
                          handleInputSocial(index, e);
                        }}
                        className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="Write the link"
                        type="text"
                      />
                    </div>
                  </div>
                </details>
              </div>
            ))}

            <button
              onClick={(e) => {
                e.preventDefault();
                setNetworksNumber(networksNumber + 1);
              }}
              className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            >
              Add Network
            </button>
          </div>

          <div className="mt-[2rem] border-b pb-[4rem] border-b-gray-300">
            <h3 className="font-bold">Contact Information</h3>

            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="address"
              >
                Friendly Address
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                placeholder="Give An Address"
                id="address"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="video"
              >
                Introduction Video URL
              </label>
              <input
                onChange={(e) => {
                  setVideoURL(e.target.value);
                }}
                value={videoURL}
                placeholder="Youtube Link"
                id="video"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="location"
              >
                Location
              </label>
              <select
                onChange={(e) => {
                  setLocationId(e.target.value);
                }}
                value={locationId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="location"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Location--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Location--
                    </option>
                    {locations.map((loca) => (
                      <option key={loca._id} value={loca._id}>
                        {loca.location}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="map"
              >
                Map
              </label>

              {cargando ? (
                <p className="text-primary font-bold">Write your Coords</p>
              ) : (
                <Map lat={Number(latitude)} long={Number(longitude)} />
              )}
            </div>

            <div className="grid grid-cols-2 mt-[2rem] gap-[3rem] ">
              <div>
                <label
                  className="font-semibold mb-[1rem] text-[1.4rem]"
                  htmlFor="latitude"
                >
                  Latitude
                </label>

                <input
                  onChange={(e) => {
                    setLatitude(Number(e.target.value));
                  }}
                  value={latitude}
                  placeholder="Latitude"
                  id="latitude"
                  className="bg-gray-100 mt-[1rem] w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                  type="number"
                />
              </div>
              <div>
                <label
                  className="font-semibold mb-[1rem] text-[1.4rem]"
                  htmlFor="longitude"
                >
                  Longitude
                </label>

                <input
                  onChange={(e) => {
                    setLongitude(Number(e.target.value));
                  }}
                  value={longitude}
                  placeholder="Longitude"
                  id="longitude"
                  className="bg-gray-100 mt-[1rem] w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                  type="number"
                />
              </div>
            </div>
          </div>

          <input
            className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            type="submit"
            value={"Save Profile"}
          />
        </form>
      </div>
    </main>
  );
}

export default Profile;
