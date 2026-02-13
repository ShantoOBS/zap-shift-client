import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Package, User, MapPin } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#056873] focus:outline-none focus:ring-2 focus:ring-[#056873]/20";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const selectClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#056873] focus:outline-none focus:ring-2 focus:ring-[#056873]/20";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: "Confirm cost",
      text: `You will be charged ৳${cost}. Continue?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#056873",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, send parcel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              title: "Parcel booked",
              text: "Confirm and continue with payment in My Parcels.",
              icon: "success",
              confirmButtonColor: "#056873",
            });
          }
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl my-5">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Send a parcel
        </h1>
        <p className="mt-2 text-sm text-[#606060]">
          Enter parcel and sender/receiver details. Cost is calculated by type,
          weight, and route.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="space-y-8 text-gray-900"
      >
        {/* Parcel type */}
        <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-[#056873]" />
            <h2 className="text-lg font-semibold">Parcel type</h2>
          </div>
          <div className="flex gap-4">
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-50/50 py-4 transition-colors has-checked:border-[#056873] has-checked:bg-[#056873]/5 has-checked:text-[#056873]">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="sr-only"
                defaultChecked
              />
              <span className="text-sm font-medium">Document</span>
            </label>
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-50/50 py-4 transition-colors has-checked:border-[#056873] has-checked:bg-[#056873]/5 has-checked:text-[#056873]">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                className="sr-only"
              />
              <span className="text-sm font-medium">Non-document</span>
            </label>
          </div>
        </section>

        {/* Parcel info */}
        <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <Package className="h-5 w-5 text-[#056873]" />
            <h2 className="text-lg font-semibold">Parcel details</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="parcelName" className={labelClass}>
                Parcel name
              </label>
              <input
                id="parcelName"
                type="text"
                {...register("parcelName")}
                className={inputClass}
                placeholder="e.g. Documents, Gift box"
              />
            </div>
            <div>
              <label htmlFor="parcelWeight" className={labelClass}>
                Weight (kg)
              </label>
              <input
                id="parcelWeight"
                type="number"
                step="0.1"
                min="0"
                {...register("parcelWeight")}
                className={inputClass}
                placeholder="0"
              />
            </div>
          </div>
        </section>

        {/* Sender & Receiver */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Sender */}
          <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-8">
            <div className="mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-[#056873]" />
              <h2 className="text-lg font-semibold">Sender details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="senderName" className={labelClass}>
                  Name
                </label>
                <input
                  id="senderName"
                  type="text"
                  {...register("senderName")}
                  defaultValue={user?.displayName ?? ""}
                  className={inputClass}
                  placeholder="Sender name"
                />
              </div>
              <div>
                <label htmlFor="senderEmail" className={labelClass}>
                  Email
                </label>
                <input
                  id="senderEmail"
                  type="email"
                  {...register("senderEmail")}
                  defaultValue={user?.email ?? ""}
                  className={inputClass}
                  placeholder="sender@example.com"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="senderRegion" className={labelClass}>
                    Region
                  </label>
                  <select
                    id="senderRegion"
                    {...register("senderRegion")}
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select region
                    </option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="senderDistrict" className={labelClass}>
                    District
                  </label>
                  <select
                    id="senderDistrict"
                    {...register("senderDistrict")}
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select district
                    </option>
                    {districtsByRegion(senderRegion).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="senderAddress" className={labelClass}>
                  Address
                </label>
                <input
                  id="senderAddress"
                  type="text"
                  {...register("senderAddress")}
                  className={inputClass}
                  placeholder="Full address"
                />
              </div>
            </div>
          </section>

          {/* Receiver */}
          <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#056873]" />
              <h2 className="text-lg font-semibold">Receiver details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="receiverName" className={labelClass}>
                  Name
                </label>
                <input
                  id="receiverName"
                  type="text"
                  {...register("receiverName")}
                  className={inputClass}
                  placeholder="Receiver name"
                />
              </div>
              <div>
                <label htmlFor="receiverEmail" className={labelClass}>
                  Email
                </label>
                <input
                  id="receiverEmail"
                  type="email"
                  {...register("receiverEmail")}
                  className={inputClass}
                  placeholder="receiver@example.com"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="receiverRegion" className={labelClass}>
                    Region
                  </label>
                  <select
                    id="receiverRegion"
                    {...register("receiverRegion")}
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select region
                    </option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="receiverDistrict" className={labelClass}>
                    District
                  </label>
                  <select
                    id="receiverDistrict"
                    {...register("receiverDistrict")}
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select district
                    </option>
                    {districtsByRegion(receiverRegion).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="receiverAddress" className={labelClass}>
                  Address
                </label>
                <input
                  id="receiverAddress"
                  type="text"
                  {...register("receiverAddress")}
                  className={inputClass}
                  placeholder="Full address"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-6">
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-[#caeb66] px-8 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-[#b8d95a]"
          >
            Send parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
