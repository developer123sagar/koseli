/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import { Spinner, TextEditor, ToastMsg, Upload } from "@/common";
import axios from "axios";
import { url } from "@/routes";
import { FormState } from "@/dashboard/page/Riders";
import { useNavigate } from "react-router-dom";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { BloodGroup, MessageType } from "@/types";
import { bloodGroupOpt } from "@/constants";
import PDFViewer from "@/common/PDFViewer";

const AddRider = () => {
  const [form, setForm] = useState(FormState);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [loading, setLoading] = useState(false);
  const [insuranceDes, setInsuranceDes] = useState({
    desc: "",
  });
  const [inusranceImg, setInsuranceImg] = useState({
    document: "",
  });
  const [citizenImg, setCitizenImg] = useState({
    backImage: "",
    frontImage: "",
  });
  const [vehicleImg, setVehicleImg] = useState({
    img: "",
  });

  const [blueBookImg, setBlueBookImg] = useState({
    frontImage: "",
    backImage: "",
    middleImage: "",
  });

  const [lisenceImg, setLicenceImg] = useState({
    backImage: "",
    frontImage: "",
  });

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const { confirmPassword, ...newFormValues } = form;
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updateForm = { ...newFormValues };
    updateForm.blueBook.backImage = blueBookImg.backImage;
    updateForm.blueBook.middleImage = blueBookImg.middleImage;
    updateForm.blueBook.frontImage = blueBookImg.frontImage;

    updateForm.citizenship.backImage = citizenImg.backImage;
    updateForm.citizenship.frontImage = citizenImg.frontImage;

    updateForm.insurance.description = insuranceDes.desc;
    updateForm.insurance.document = inusranceImg.document;

    updateForm.vehicle.image = vehicleImg.img;

    updateForm.license.frontImage = lisenceImg.frontImage;
    updateForm.license.backImage = lisenceImg.backImage;

    console.log(updateForm);

    if (form.password === form.confirmPassword && form.password.length > 6) {
      try {
        const res = await axios.post(`${url}/rider/auth/add`, updateForm, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.status === 200) {
          setForm(FormState);
          navigate("/dashboard/riders/requestriders");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          msg: "Password lenght must be greater than 6",
          theme: "fail",
        },
      ]);
    }
  };

  return (
    <main className="mt-20">
      <ToastMsg messages={messages} setMessages={setMessages} />

      <NameMark label="Add Rider Details" variant="primary" />
      <form className="mt-6">
        {/* personal informations */}
        <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
          Personal Details
        </h1>
        <div className="flex flex-wrap justify-between gap-8 mt-4">
          <EditInput
            label="Full Name"
            basis={48}
            value={form.name}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                name: e.target.value,
              }))
            }
            placeH="Enter Full Name"
          />
          <EditInput
            label="Email"
            basis={48}
            value={form.email}
            onChange={(e) =>
              setForm((prevForm) => ({ ...prevForm, email: e.target.value }))
            }
            placeH="Enter Your Email"
          />
          <EditInput
            label="Mobile Number"
            basis={48}
            value={form.phone}
            onChange={(e) =>
              setForm((prevForm) => ({ ...prevForm, phone: e.target.value }))
            }
            placeH="Enter your mobile number"
          />
          <EditInput
            label="Secondary Mobile Number"
            basis={48}
            value={form.secondaryPhone}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                secondaryPhone: e.target.value,
              }))
            }
            placeH="Enter your secondary mobile number"
          />
          <EditInput
            label="Father Name"
            basis={48}
            value={form.fatherName}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                fatherName: e.target.value,
              }))
            }
            placeH="Enter Father name"
          />
          <EditInput
            label="Mother Name"
            basis={48}
            value={form.motherName}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                motherName: e.target.value,
              }))
            }
            placeH="Enter mother name"
          />
          <EditInput
            label="Grand Father Name"
            basis={48}
            value={form.grandFatherName}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                grandFatherName: e.target.value,
              }))
            }
            placeH="Enter grand father name"
          />
          <EditInput
            label="Password"
            basis={48}
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                password: e.target.value,
              }))
            }
            placeH="Enter Password"
          />
          <EditInput
            label="Confirm Password"
            basis={48}
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                confirmPassword: e.target.value,
              }))
            }
            placeH="Confirm your password"
          />
          <div className="basis-[48%] flex flex-col">
            <label className="text-sm font-semibold text-black">Gender</label>
            <select
              name="gender"
              className="py-3 pl-3 border border-gray-200 mt-2 text-gray-400 form-control"
              value={form.gender}
              onChange={handleGenderChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="basis-[48%] flex flex-col">
            <label className="text-sm font-semibold text-black">
              Blood Group
            </label>
            <select
              name="blood-group"
              className="py-3 pl-3 border border-gray-200 mt-2 text-gray-400 form-control"
              value={form.bloodGroup}
              onChange={(e) =>
                setForm({ ...form, bloodGroup: e.target.value as BloodGroup })
              }
            >
              {bloodGroupOpt.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="basis-[48%] flex flex-col ">
            <label className="text-sm font-semibold text-black">
              Date of birth
            </label>
            <input
              onChange={(e) =>
                setForm({ ...form, dob: new Date(e.target.value) })
              }
              type="date"
              name="dob"
              className="form-control text-sm w-full  py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="h-[2px] w-full mt-[30px] mb-6">
              <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                Rider Photo ?
              </span>
            </div>
            <Upload
              accept=".jpg, .jpeg, .png"
              fieldName="photo"
              imgTitle="rider"
              setForm={setForm}
            />
          </div>
        </div>
        {/* address Details */}
        <div className="my-16">
          <h2 className="my-3 text-2xl font-bold border-b border-gray-300">
            Address Details
          </h2>
          <div>
            <h3 className="text-gray-900 text-lg">1. Current Address</h3>
            <div className="flex flex-wrap justify-between gap-8 mt-2">
              <EditInput
                label="City"
                basis={48}
                value={form.currentAddress.city}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    currentAddress: {
                      ...prevForm.currentAddress,
                      city: e.target.value,
                    },
                  }))
                }
                placeH="Enter city name"
              />
              <EditInput
                label="State"
                basis={48}
                value={form.currentAddress.state}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    currentAddress: {
                      ...prevForm.currentAddress,
                      state: e.target.value,
                    },
                  }))
                }
                placeH="Enter state name"
              />
              <EditInput
                label="Street"
                basis={48}
                value={form.currentAddress.street}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    currentAddress: {
                      ...prevForm.currentAddress,
                      street: e.target.value,
                    },
                  }))
                }
                placeH="Enter street name"
              />
              <EditInput
                label="Zip Code"
                basis={48}
                type="number"
                value={form.currentAddress.zipCode as number}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    currentAddress: {
                      ...prevForm.currentAddress,
                      zipCode: parseInt(e.target.value),
                    },
                  }))
                }
                placeH="Enter city name"
              />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-gray-900 text-lg">2. Permanent Address</h3>
            <div className="flex flex-wrap justify-between gap-8 mt-2">
              <EditInput
                label="City"
                basis={48}
                value={form.permanentAddress.city}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    permanentAddress: {
                      ...prevForm.permanentAddress,
                      city: e.target.value,
                    },
                  }))
                }
                placeH="Enter city name"
              />
              <EditInput
                label="State"
                basis={48}
                value={form.permanentAddress.state}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    permanentAddress: {
                      ...prevForm.permanentAddress,
                      state: e.target.value,
                    },
                  }))
                }
                placeH="Enter state name"
              />
              <EditInput
                label="Street"
                basis={48}
                value={form.permanentAddress.street}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    permanentAddress: {
                      ...prevForm.permanentAddress,
                      street: e.target.value,
                    },
                  }))
                }
                placeH="Enter street name"
              />
              <EditInput
                label="Zip Code"
                basis={48}
                value={form.permanentAddress.zipCode as number}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    permanentAddress: {
                      ...prevForm.permanentAddress,
                      zipCode: parseInt(e.target.value),
                    },
                  }))
                }
                placeH="Enter city name"
              />
            </div>
          </div>
        </div>
        {/* citizenship details */}
        <div className="my-16">
          <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
            Citizenship Details
          </h1>
          <div className="flex flex-wrap justify-between gap-8 mt-4">
            <EditInput
              label="Citizenship Number"
              basis={48}
              value={form.citizenship.citizenshipNo}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  citizenship: {
                    ...prevForm.citizenship,
                    citizenshipNo: e.target.value,
                  },
                }))
              }
              placeH="Enter your citizenship number"
            />
            <EditInput
              label="Citizenship Issued Place"
              basis={48}
              value={form.citizenship.issuedPlace}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  citizenship: {
                    ...prevForm.citizenship,
                    issuedPlace: e.target.value,
                  },
                }))
              }
              placeH="Enter your citizenship Issued place"
            />
            <div className="w-full basis-[48%] flex flex-col ">
              <label className="text-sm font-semibold text-black">
                Issued Date
              </label>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    citizenship: {
                      ...form.citizenship,
                      issuedDate: new Date(e.target.value),
                    },
                  })
                }
                type="date"
                className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
              />
            </div>
          </div>
          <div className="w-full flex gap-5 justify-between">
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    Citizenship Front Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png"
                  fieldName="frontImage"
                  imgTitle="citizenship"
                  setForm={setCitizenImg}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    Citizenship Back Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png"
                  fieldName="backImage"
                  imgTitle="citizen"
                  setForm={setCitizenImg}
                />
              </div>
            </div>
          </div>
        </div>
        {/* vehicle information */}
        <div className="my-16">
          <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
            Vehicle Details
          </h1>
          <div className="flex flex-wrap justify-between gap-8 mt-4">
            <EditInput
              label="Vehicle Color"
              basis={48}
              value={form.vehicle.color}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  vehicle: {
                    ...prevForm.vehicle,
                    color: e.target.value,
                  },
                }))
              }
              placeH="Enter your vehicle color"
            />
            <EditInput
              label="Vehicle Model"
              basis={48}
              value={form.vehicle.model}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  vehicle: {
                    ...prevForm.vehicle,
                    model: e.target.value,
                  },
                }))
              }
              placeH="Enter your vehicle model"
            />
            <EditInput
              label="Vehicle Number"
              basis={48}
              value={form.vehicle.vehicleNumber}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  vehicle: {
                    ...prevForm.vehicle,
                    vehicleNumber: e.target.value,
                  },
                }))
              }
              placeH="Enter your vehicle number"
            />

            <div className="basis-[48%]">
              <h1>Choose Vehicle Type</h1>
              <select
                name="vehicle"
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicle: { ...form.vehicle, vehicleType: e.target.value },
                  })
                }
                className={`form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1`}
              >
                <option value="Bike">Bike</option>
                <option value="Scooty">Scooty</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Electric Vehicle">Electric vehicle</option>
              </select>
            </div>

            <EditInput
              label="Vehicle Issued Place"
              basis={48}
              value={form.vehicle.issuedPlace}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  vehicle: {
                    ...prevForm.vehicle,
                    issuedPlace: e.target.value,
                  },
                }))
              }
              placeH="Enter your vehicle issued place"
            />

            <div className="w-full basis-[48%] flex flex-col ">
              <label className="text-sm font-semibold text-black">
                Issued Date
              </label>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicle: {
                      ...form.vehicle,
                      issuedDate: new Date(e.target.value),
                    },
                  })
                }
                type="date"
                className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
              />
            </div>

            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    Vehicle Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png"
                  fieldName="img"
                  imgTitle="rider_vehicle"
                  setForm={setVehicleImg}
                />
              </div>
            </div>
          </div>
        </div>
        {/* insurance Details */}
        <div className="my-16">
          <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
            Insurance Details
          </h1>
          <div className="flex flex-wrap justify-between gap-8 mt-4">
            <EditInput
              label="Insurance Number"
              basis={48}
              value={form.insurance.insuranceNumber}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  insurance: {
                    ...prevForm.insurance,
                    insuranceNumber: e.target.value,
                  },
                }))
              }
              placeH="Enter your insurance number"
            />
            <EditInput
              label="Issued Vendor"
              basis={48}
              value={form.insurance.issuedVendor}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  insurance: {
                    ...prevForm.insurance,
                    issuedVendor: e.target.value,
                  },
                }))
              }
              placeH="Enter issued vendor"
            />

            <div className="w-full basis-[48%] flex flex-col ">
              <label className="text-sm font-semibold text-black">
                Issued Date
              </label>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    insurance: {
                      ...form.insurance,
                      issuedDate: new Date(e.target.value),
                    },
                  })
                }
                type="date"
                className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
              />
            </div>
            <div className="w-full basis-[48%] flex flex-col ">
              <label className="text-sm font-semibold text-black">
                Expiry Date
              </label>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    insurance: {
                      ...form.insurance,
                      expireDate: new Date(e.target.value),
                    },
                  })
                }
                type="date"
                className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
              />
            </div>
          </div>
          <div className="my-2">
            <label className="text-[black] font-semibold text-[14px]">
              Description
            </label>
            <TextEditor setForm={setInsuranceDes} fieldName="desc" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="h-[2px] w-full mt-[30px] mb-6">
                <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                  Insurance Document ?
                </span>
              </div>
              <Upload
                accept=".pdf"
                fieldName="document"
                imgTitle="insurance_document"
                setForm={setInsuranceImg}
                showImage={false}
              />
            </div>
            {inusranceImg.document && <PDFViewer src={inusranceImg.document} />}
          </div>
        </div>
        {/* lisence details */}
        <div className="my-16">
          <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
            License Details
          </h1>
          <div className="flex flex-wrap justify-between gap-8 mt-4">
            <EditInput
              label="License Number"
              basis={48}
              value={form.license.licenseNo}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  license: {
                    ...prevForm.license,
                    licenseNo: e.target.value,
                  },
                }))
              }
              placeH="Enter your license number"
            />
            <EditInput
              label="License Issued place"
              basis={48}
              value={form.license.issuedPlace}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  license: {
                    ...prevForm.license,
                    issuedPlace: e.target.value,
                  },
                }))
              }
              placeH="Enter your license issued place"
            />
            <div className="w-full basis-[48%] flex flex-col ">
              <label className="text-sm font-semibold text-black">
                Issued Date
              </label>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    license: {
                      ...form.license,
                      issuedDate: new Date(e.target.value),
                    },
                  })
                }
                type="date"
                className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
              />
            </div>
            <div className="w-full basis-[48%] flex flex-col ">
              <label className="text-sm font-semibold text-black">
                Expiry Date
              </label>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    license: {
                      ...form.license,
                      expireDate: new Date(e.target.value),
                    },
                  })
                }
                type="date"
                className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    License Front Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png, .pdf"
                  fieldName="frontImage"
                  imgTitle="license_document"
                  setForm={setLicenceImg}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    License Back Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png, .pdf"
                  fieldName="backImage"
                  imgTitle="license_document"
                  setForm={setLicenceImg}
                />
              </div>
            </div>
          </div>
        </div>
        {/* bluebook details */}
        <div className="my-16">
          <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
            Bluebook Details
          </h1>
          <div className="flex flex-wrap justify-between gap-8 mt-4">
            <EditInput
              label="Bluebook Number"
              basis={100}
              value={form.blueBook.blueBookNumber}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  blueBook: {
                    ...prevForm.blueBook,
                    blueBookNumber: e.target.value,
                  },
                }))
              }
              placeH="Enter your bluebook number"
            />
            <div className="w-full flex justify-between gap-8">
              <div className="w-full basis-[48%] flex flex-col ">
                <label className="text-sm font-semibold text-black">
                  Issued Date
                </label>
                <input
                  onChange={(e) =>
                    setForm({
                      ...form,
                      blueBook: {
                        ...form.blueBook,
                        issuedDate: new Date(e.target.value),
                      },
                    })
                  }
                  type="date"
                  className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                />
              </div>
              <div className="w-full basis-[48%] flex flex-col ">
                <label className="text-sm font-semibold text-black">
                  Expiry Date
                </label>
                <input
                  onChange={(e) =>
                    setForm({
                      ...form,
                      blueBook: {
                        ...form.blueBook,
                        expireDate: new Date(e.target.value),
                      },
                    })
                  }
                  type="date"
                  className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-5 justify-between mt-6">
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    Front Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png"
                  fieldName="frontImage"
                  imgTitle="bluebook"
                  setForm={setBlueBookImg}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    Middle Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png"
                  fieldName="middleImage"
                  imgTitle="bluebook"
                  setForm={setBlueBookImg}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                    Back Photo ?
                  </span>
                </div>
                <Upload
                  accept=".jpg, .jpeg, .png"
                  fieldName="backImage"
                  imgTitle="bluebook"
                  setForm={setBlueBookImg}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-[2px] w-full mt-[30px] mb-6">
            <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
              Contract Document ?
            </span>
          </div>
          <Upload
            accept=".pdf"
            fieldName="contractDoc"
            imgTitle="contract"
            setForm={setForm}
            showImage={false}
          />
          {form.contractDoc && <PDFViewer src={form.contractDoc} />}
        </div>
        <div className="mt-6 flex justify-end gap-4 mb-2">
          <Buttons type="submit" onClick={handleFormSubmit}>
            {loading ? <Spinner btn /> : "Create"}
          </Buttons>
          <Buttons back variant="destructive">
            Cancel
          </Buttons>
        </div>
      </form>
    </main>
  );
};

export default AddRider;
