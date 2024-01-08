import { RootState, useAppSelector } from "@/redux/store";
import { IRiders } from "@/types";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { formatDate } from "@/helpers";
import { baseImgUrl } from "@/routes";
import { TextEditor } from "@/common";
import PDFViewer from "@/common/PDFViewer";

const ViewRider = () => {
  const selectedItem: IRiders = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  return (
    <div className="mt-20 w-full">
      {/* personal Informations */}
      <div>
        <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
          Personal Details
        </h1>
        <div className="flex flex-wrap justify-between gap-8 mt-4">
          <ViewInputField
            label="Full Name"
            basis={48}
            value={selectedItem?.rider?.name}
          />
          <ViewInputField
            label="Email"
            basis={48}
            value={selectedItem?.email}
          />
          <ViewInputField
            label="Mobile Number"
            basis={48}
            value={selectedItem?.phone}
          />
          <ViewInputField
            label="Secondary Mobile Number"
            basis={48}
            value={selectedItem?.secondaryPhone}
          />
          <ViewInputField
            label="Father Name"
            basis={48}
            value={selectedItem?.fatherName}
          />
          <ViewInputField
            label="Mother Name"
            basis={48}
            value={selectedItem?.motherName}
          />
          <ViewInputField
            label="Grand Father Name"
            basis={48}
            value={selectedItem?.grandFatherName}
          />
          <ViewInputField
            label="Blood Group"
            basis={48}
            value={selectedItem?.bloodGroup}
          />
          <ViewInputField
            label="Gender"
            basis={48}
            value={selectedItem?.rider?.gender}
          />

          <div className="basis-[48%] flex flex-col ">
            <label className="text-sm font-semibold text-black">
              Date of birth
            </label>
            <p className="form-control text-sm w-full  py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1">
              {formatDate(selectedItem?.dob)}
            </p>
          </div>

          <div>
            <label className="mb-2.5 block text-black">Rider Photo</label>
            <div className="flex gap-2">
              <img
                src={`${baseImgUrl}/${selectedItem?.photo}`}
                alt={selectedItem?.name}
                className="w-[35rem] h-[25rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* address details */}
      <div className="my-16">
        <h2 className="my-3 text-2xl font-bold border-b border-gray-300">
          Address Details
        </h2>
        <div>
          <h3 className="text-gray-900 text-lg">1. Current Address</h3>
          <div className="flex flex-wrap justify-between gap-8 mt-2">
            <ViewInputField
              basis={48}
              label="City"
              value={selectedItem?.currentAddress?.city}
            />
            <ViewInputField
              basis={48}
              label="State"
              value={selectedItem?.currentAddress?.state}
            />
            <ViewInputField
              basis={48}
              label="Street"
              value={selectedItem?.currentAddress?.street}
            />
            <ViewInputField
              basis={48}
              label="Zip Code"
              value={selectedItem?.currentAddress?.zipCode as number}
            />
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-gray-900 text-lg">2. Permanent Address</h3>
          <div className="flex flex-wrap justify-between gap-8 mt-2">
            <ViewInputField
              basis={48}
              label="City"
              value={selectedItem?.permanentAddress?.city}
            />
            <ViewInputField
              basis={48}
              label="State"
              value={selectedItem?.permanentAddress?.state}
            />
            <ViewInputField
              basis={48}
              label="Street"
              value={selectedItem?.permanentAddress?.street}
            />
            <ViewInputField
              basis={48}
              label="Zip Code"
              value={selectedItem?.permanentAddress?.zipCode as number}
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
          <ViewInputField
            basis={48}
            label="Cititzenship Number"
            value={selectedItem?.citizenship?.citizenshipNo}
          />
          <ViewInputField
            basis={48}
            label="Cititzenship Issued Place"
            value={selectedItem?.citizenship?.issuedPlace}
          />
          <div className="basis-[48%] flex flex-col">
            <label className="text-sm font-semibold text-black">
              Issued Date
            </label>
            <p className="form-control text-sm w-full  py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1">
              {formatDate(selectedItem?.citizenship?.issuedDate)}
            </p>
          </div>
          <div className="w-full flex gap-x-5 justify-between">
            <div>
              <div className="w-full mb-2">
                <span className="text-sm font-semibold text-black mb-2">
                  Citizenship Front Photo ?
                </span>
              </div>
              <img
                src={`${baseImgUrl}/${selectedItem?.citizenship?.frontImage}`}
                alt={selectedItem?.citizenship?.frontImage}
                className="w-[20rem] h-[15rem] object-cover"
              />
            </div>
            <div>
              <div className="w-full mb-2">
                <span className=" text-sm font-semibold text-black mb-2">
                  Citizenship Back Photo ?
                </span>
              </div>
              <img
                src={`${baseImgUrl}/${selectedItem?.citizenship?.backImage}`}
                alt={selectedItem?.citizenship?.frontImage}
                className="w-[20rem] h-[15rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* vehicle Details */}
      <div className="my-16">
        <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
          Vehicle Details
        </h1>
        <div className="flex flex-wrap justify-between gap-8 mt-4 mb-6">
          <ViewInputField
            label="Vehicle Color"
            basis={48}
            value={selectedItem?.vehicle?.color}
          />
          <ViewInputField
            label="Vehicle Model"
            basis={48}
            value={selectedItem?.vehicle?.model}
          />
          <ViewInputField
            label="Vehicle Number"
            basis={48}
            value={selectedItem?.vehicle?.vehicleNumber}
          />
          <ViewInputField
            label="Vehicle Type"
            basis={48}
            value={selectedItem?.vehicle?.vehicleType}
          />
          <ViewInputField
            label="Vehicle Issued Place"
            basis={48}
            value={selectedItem?.vehicle?.issuedPlace}
          />
          <ViewInputField
            label="Vehicle Issued Date"
            basis={48}
            value={formatDate(selectedItem?.vehicle?.issuedDate)}
          />
        </div>
        <div>
          <div className=" w-full mb-2">
            <span className=" text-sm font-semibold text-black mb-2">
              Vehicle Photo ?
            </span>
          </div>
          <img
            src={`${baseImgUrl}/${selectedItem?.vehicle?.image}`}
            alt={selectedItem?.vehicle?.vehicleNumber}
            className="w-[35rem] h-[25rem] object-cover"
          />
        </div>
      </div>

      {/* insurance details */}
      <div className="my-16">
        <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
          Insurance Details
        </h1>
        <div className="flex flex-wrap justify-between gap-8 mt-4">
          <ViewInputField
            label="Insurance Number"
            basis={48}
            value={selectedItem?.insurance?.insuranceNumber}
          />
          <ViewInputField
            label="Insurance Issued Vendor"
            basis={48}
            value={selectedItem?.insurance?.issuedVendor}
          />
          <ViewInputField
            label="Insurance Issued Date"
            basis={48}
            value={formatDate(selectedItem?.insurance?.issuedDate)}
          />
          <ViewInputField
            label="Insurance Expiry Date"
            basis={48}
            value={formatDate(selectedItem?.insurance?.expireDate)}
          />
        </div>
        <div className="my-6">
          <label className="text-gray-900">Description</label>
          <TextEditor
            existingDescription={
              selectedItem?.insurance?.description || "Not available"
            }
            disabled
          />
        </div>
        <div className="w-full flex gap-x-5 justify-between">
          <div>
            <div className="w-full mb-2">
              <span className=" text-sm font-semibold text-black mb-2">
                Insurance Document ?
              </span>
            </div>
            <PDFViewer src={selectedItem?.insurance?.document} />
          </div>
        </div>
      </div>

      {/* license details */}
      <div className="my-16">
        <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
          License Details
        </h1>
        <div className="flex flex-wrap justify-between gap-8 mt-4 mb-6">
          <ViewInputField
            label="License Number"
            basis={48}
            value={selectedItem?.license?.licenseNo}
          />
          <ViewInputField
            label="License Issued Place"
            basis={48}
            value={selectedItem?.license?.issuedPlace}
          />
          <ViewInputField
            label="License Issued Date"
            basis={48}
            value={formatDate(selectedItem?.license?.issuedDate)}
          />
          <ViewInputField
            label="License Expiry Date"
            basis={48}
            value={formatDate(selectedItem?.license?.expireDate)}
          />
        </div>
        <div className="w-full gap-x-6 flex justify-between">
          <div>
            <label className="mb-2.5 block text-black">
              License Front Photo ?
            </label>
            <div className="flex gap-2">
              <img
                src={`${baseImgUrl}/${selectedItem?.license?.frontImage}`}
                alt={selectedItem?.license?.licenseNo}
                className="w-[25rem] h-[25rem] object-cover"
              />
            </div>
          </div>
          <div>
            <label className="mb-2.5 block text-black">
              License Back Photo ?
            </label>
            <div className="flex gap-2">
              <img
                src={`${baseImgUrl}/${selectedItem?.license?.backImage}`}
                alt={selectedItem?.license?.licenseNo}
                className="w-[25rem] h-[25rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* bluebookd Details */}
      <div className="my-16">
        <h1 className="my-3 text-2xl font-bold border-b border-gray-300">
          Bluebook Details
        </h1>
        <div className="flex flex-wrap justify-between gap-8 mt-4 mb-6">
          <ViewInputField
            label="Bluebook Number"
            basis={48}
            value={selectedItem?.blueBook?.blueBookNumber}
          />
          <ViewInputField
            label="Bluebook Issued Date"
            basis={48}
            value={formatDate(selectedItem?.blueBook?.issuedDate)}
          />
          <ViewInputField
            label="Bluebook Expiry Date"
            basis={48}
            value={formatDate(selectedItem?.blueBook?.expireDate)}
          />
        </div>
        <div className="w-full flex gap-x-5 justify-between">
          <div>
            <div className="w-full mb-2">
              <span className=" text-sm font-semibold text-black mb-2">
                Bluebook Front Photo ?
              </span>
            </div>
            <img
              src={`${baseImgUrl}/${selectedItem?.blueBook?.frontImage}`}
              alt={selectedItem?.blueBook?.blueBookNumber}
              className="w-[20rem] h-[15rem] object-cover"
            />
          </div>
          <div>
            <div className="w-full mb-2">
              <span className=" h-[15rem]text-sm font-semibold text-black mb-2">
                Bluebook Middle Photo ?
              </span>
            </div>
            <img
              src={`${baseImgUrl}/${selectedItem?.blueBook?.backImage}`}
              alt={selectedItem?.blueBook?.blueBookNumber}
              className="w-[20rem] h-[15rem] object-cover"
            />
          </div>
          <div>
            <div className="w-full mb-2">
              <span className="text-sm font-semibold text-black mb-2">
                Bluebook Back Photo ?
              </span>
            </div>
            <img
              src={`${baseImgUrl}/${selectedItem?.blueBook?.backImage}`}
              alt={selectedItem?.blueBook?.blueBookNumber}
              className="w-[20rem] h-[15rem] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full mb-2">
          <span className=" text-sm font-semibold text-black mb-2">
            Contract Document ?
          </span>
        </div>
        <PDFViewer src={selectedItem?.contractDoc} />
      </div>
    </div>
  );
};

export default ViewRider;
