import { Spinner, TextEditor, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import PDFViewer from "@/common/PDFViewer";
import { bloodGroupOpt } from "@/constants";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { BloodGroup, IRiders } from "@/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditRider = () => {
  const selectedItem: IRiders = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const [form, setForm] = useState(selectedItem || {});

  const [insuranceDes, setInsuranceDes] = useState({
    desc: form?.insurance?.description || "",
  });

  const [riderImg, setRiderImg] = useState({
    img: form?.photo || "",
  });

  const [inusranceImg, setInsuranceImg] = useState({
    document: form?.insurance?.document || "",
  });

  const [citizenImg, setCitizenImg] = useState({
    backImage: form?.citizenship?.backImage || "",
    frontImage: form?.citizenship?.frontImage || "",
  });

  const [vehicleImg, setVehicleImg] = useState({
    img: form?.vehicle?.image || "",
  });

  const [blueBookImg, setBlueBookImg] = useState({
    frontImage: form?.blueBook?.frontImage || "",
    backImage: form?.blueBook?.backImage || "",
    middleImage: form?.blueBook?.middleImage || "",
  });

  const [lisenceImg, setLicenceImg] = useState({
    frontImage: form?.license?.frontImage || "",
    backImage: form?.license?.backImage || "",
  });

  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);

  const { role, token } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      rider: {
        ...prevForm.rider,
        gender: value,
      },
    }));
  };

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    const updateForm = { ...form };

    if (riderImg.img) {
      updateForm.photo = riderImg.img;
      updateForm.rider = {
        ...updateForm.rider,
        photo: riderImg.img,
      };
    }

    updateForm.blueBook = {
      ...updateForm.blueBook,
      backImage: blueBookImg.backImage,
      middleImage: blueBookImg.middleImage,
      frontImage: blueBookImg.frontImage,
    };

    updateForm.citizenship = {
      ...updateForm.citizenship,
      backImage: citizenImg.backImage,
      frontImage: citizenImg.frontImage,
    };

    updateForm.insurance = {
      ...updateForm.insurance,
      description: insuranceDes.desc,
      document: inusranceImg.document,
    };

    updateForm.license = {
      ...updateForm.license,
      frontImage: lisenceImg.frontImage,
      backImage: lisenceImg.backImage,
    };

    updateForm.vehicle = {
      ...updateForm.vehicle,
      image: vehicleImg.img,
    };
    console.log(role);

    try {
      if (role === "admin")
        await dispatch(
          UpdateData({
            api: `rider/auth/edit?rider=${selectedItem?.rider?._id}`,
            form: updateForm,
            token: token!,
          })
        );
      navigate("/dashboard/riders/activeriders");
    } catch (err) {
      console.log(err);
    }
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  console.log(form);

  return (
    <>
      <div className="mt-16">
        <NameMark label="Edit Rider Details" variant="primary" />
        <form className="mt-6">
          {/* personal Details */}
          <div>
            <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
              Personal Details
            </h1>
            <div className="flex flex-wrap justify-between gap-8 mt-4">
              <EditInput
                label="Full Name"
                basis={48}
                value={form?.rider?.name}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    name: e.target.value,
                    rider: { ...prevForm.rider, name: e.target.value },
                  }))
                }
                placeH="Enter Full Name"
              />
              <EditInput
                label="Email"
                basis={48}
                value={form.email}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    email: e.target.value,
                    rider: { ...prevForm.rider, email: e.target.value },
                  }))
                }
                placeH="Enter your email"
              />
              <EditInput
                label="Mobile Number"
                basis={48}
                value={form.phone}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    rider: { ...prevForm.rider, phone: e.target.value },
                    phone: e.target.value,
                  }))
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

              <div className="basis-[48%] flex flex-col">
                <label className="text-sm font-semibold text-black">
                  Blood Group
                </label>
                <select
                  name="blood group"
                  className="py-3 border border-gray-200 mt-2 text-gray-400 form-control"
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bloodGroup: e.target.value as BloodGroup,
                    })
                  }
                >
                  {bloodGroupOpt.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="basis-[48%] flex flex-col">
                <label className="text-sm font-semibold text-black">
                  Gender
                </label>
                <select
                  name="gender"
                  className="py-3 border border-gray-200 mt-2 text-gray-400 form-control"
                  value={form.gender}
                  onChange={handleGenderChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                  className="form-control text-sm w-full  py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                />
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="h-[2px] w-full mt-[30px] mb-6">
                    <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                      Rider Photo ?
                    </span>
                  </div>
                  <Upload
                    existingImg={[selectedItem?.photo]}
                    accept=".jpg, .jpeg, .png"
                    fieldName="img"
                    imgTitle="rider"
                    setForm={setRiderImg}
                  />
                </div>
              </div>
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
                  value={form?.currentAddress?.city}
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
                  value={form?.currentAddress?.state}
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
                  value={form?.currentAddress?.street}
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
                  value={form?.currentAddress?.zipCode as number}
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
                  value={form?.permanentAddress?.city}
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
                  value={form?.permanentAddress?.state}
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
                  value={form?.permanentAddress?.street}
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
                  value={form?.permanentAddress?.zipCode as number}
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
                value={form?.citizenship?.citizenshipNo}
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
                value={form?.citizenship?.issuedPlace}
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
                    existingImg={[selectedItem?.citizenship?.frontImage]}
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
                    existingImg={[selectedItem?.citizenship?.backImage]}
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
                value={form?.vehicle?.color}
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
                value={form?.vehicle?.model}
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
                value={form?.vehicle?.vehicleNumber}
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
                value={form?.vehicle?.issuedPlace}
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
                    existingImg={[selectedItem?.vehicle?.image]}
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
                value={form?.insurance?.insuranceNumber}
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
                value={form?.insurance?.issuedVendor}
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
              <TextEditor
                setForm={setInsuranceDes}
                fieldName="desc"
                existingDescription={cleanedDesc}
              />
            </div>

            <div className="w-full flex gap-5 justify-between mt-6">
              <div className="flex justify-between">
                <div>
                  <div className="h-[2px] w-full mt-[30px] mb-6">
                    <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                      Insurance Document ?
                    </span>
                  </div>
                  <Upload
                    accept=".pdf"
                    fieldName="document"
                    imgTitle="insurance"
                    setForm={setInsuranceImg}
                    showImage={false}
                  />
                  <PDFViewer src={inusranceImg.document} />
                </div>
              </div>
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
                value={form?.license?.licenseNo}
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
                value={form?.license?.issuedPlace}
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
            <div className="w-full flex justify-between">
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
                    existingImg={[selectedItem?.license?.frontImage]}
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
                    fieldName="frontImage"
                    imgTitle="license_document"
                    setForm={setLicenceImg}
                    existingImg={[selectedItem?.license?.backImage]}
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
                value={form?.blueBook?.blueBookNumber}
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
                      Bluebook Front Photo ?
                    </span>
                  </div>
                  <Upload
                    accept=".jpg, .jpeg, .png"
                    fieldName="frontImage"
                    imgTitle="bluebook"
                    setForm={setBlueBookImg}
                    existingImg={[selectedItem?.blueBook?.frontImage]}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="h-[2px] w-full mt-[30px] mb-6">
                    <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                      Bluebook Middle Photo ?
                    </span>
                  </div>
                  <Upload
                    accept=".jpg, .jpeg, .png"
                    fieldName="middleImage"
                    imgTitle="bluebook"
                    setForm={setBlueBookImg}
                    existingImg={[selectedItem?.blueBook?.middleImage]}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="h-[2px] w-full mt-[30px] mb-6">
                    <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                      Bluebook Back Photo ?
                    </span>
                  </div>
                  <Upload
                    accept=".jpg, .jpeg, .png"
                    fieldName="backImage"
                    imgTitle="bluebook"
                    setForm={setBlueBookImg}
                    existingImg={[selectedItem?.blueBook?.backImage]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-[2px] w-full mt-[30px] mb-6">
              <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                Contract Document ?
              </span>
            </div>
            <Upload
              accept=".jpg, .jpeg, .png, .pdf"
              fieldName="contractDoc"
              imgTitle="contract"
              setForm={setForm}
              showImage={false}
            />
            <PDFViewer src={form?.contractDoc} />
          </div>

          <Buttons
            type="button"
            onClick={handleUpdateForm}
            className="float-right"
          >
            {loading ? <Spinner btn /> : "Update"}
          </Buttons>
        </form>
      </div>
    </>
  );
};

export default EditRider;
