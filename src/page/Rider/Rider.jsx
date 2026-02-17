import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import RiderImg from '/assets/Rider.png';

const Rider = () => {
    const {
        register,
        handleSubmit,
        control,
    } = useForm();
    const auth = useAuth();
    const user = auth?.user ?? null;
    const axiosSecure = useAxiosSecure();

    const loaderData = useLoaderData();
    const serviceCenters = Array.isArray(loaderData) ? loaderData : [];
    const regions = [...new Set(serviceCenters.map((c) => c.region).filter(Boolean))];

    const districtsByRegion = (region) => {
        if (!region) return [];
        return serviceCenters
            .filter((c) => c.region === region)
            .map((d) => d.district);
    };

    const riderRegion = useWatch({ control, name: "region" });

    const handleRiderApplication = data => {
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your application has been submitted. We will reach to you in 145 days",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col-reverse md:flex-row md:items-center gap-4">

            <form onSubmit={handleSubmit(handleRiderApplication)} className='md:w-1/2  md:mt-0 bg-white/80 rounded-xl p-4 shadow-md text-black'>
                    <div className='flex flex-col md:flex-row gap-2 w-full h-full'>
                        <fieldset className="space-y-3">
                            <h4 className="text-2xl font-semibold mb-2">Rider Details</h4>
                            {/* rider name */}
                            <label className="label">Rider Name</label>
                            <input
                                type="text"
                                {...register('name')}
                                defaultValue={user?.displayName}
                                className="input w-full"
                                placeholder="Rider Name"
                            />

                            {/* rider email */}
                            <label className="label">Email</label>
                            <input
                                type="text"
                                {...register('email')}
                                defaultValue={user?.email}
                                className="input w-full"
                                placeholder="Rider Email"
                            />

                            {/* rider region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select
                                    {...register('region')}
                                    defaultValue="Pick a region"
                                    className="select w-full"
                                >
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* rider districts */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select
                                    {...register('district')}
                                    defaultValue="Pick a district"
                                    className="select w-full"
                                >
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtsByRegion(riderRegion).map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>


                            {/* rider address */}
                            <label className="label mt-4">Your Address</label>
                            <input
                                type="text"
                                {...register('address')}
                                className="input w-full"
                                placeholder="Your Address"
                            />
                        </fieldset>
                        <fieldset className="space-y-3">
                            <h4 className="text-2xl font-semibold mb-2">More Details</h4>
                            <label className="label">Driving License</label>
                            <input
                                type="text"
                                {...register('license')}
                                className="input w-full"
                                placeholder="Driving License"
                            />

                            <label className="label">NID</label>
                            <input
                                type="text"
                                {...register('nid')}
                                className="input w-full"
                                placeholder="NID"
                            />

                            <label className="label mt-4">Bike</label>
                            <input
                                type="text"
                                {...register('bike')}
                                className="input w-full"
                                placeholder="Bike"
                            />
                        </fieldset>
                    </div>
                    <input type="submit" className='btn btn-primary mt-8 text-black w-full' value="Apply as a Rider" />
                </form>

                <div className="md:w-1/2 flex flex-col items-center md:items-start">
                    <img
                        src={RiderImg}
                        alt="Rider"
                        className="object-contain mb-4 rounded-2xl shadow-lg bg-white/60"
                    />
                    <h2 className="text-4xl text-primary font-bold mb-4">Be a Rider</h2>
                    {/* Improved UL for requirements/steps */}
                    <ul className="list-none space-y-3 bg-white rounded-xl px-6 py-4 shadow-md w-full md:w-auto">
                        <li className="flex items-center gap-2 text-lg">
                            <span role="img" aria-label="doc" className="text-blue-500">📄</span>
                            Must have a valid Driving License &amp; NID
                        </li>
                        <li className="flex items-center gap-2 text-lg">
                            <span role="img" aria-label="bike" className="text-green-500">🏍️</span>
                            Own or have access to a bike
                        </li>
                        <li className="flex items-center gap-2 text-lg">
                            <span role="img" aria-label="location" className="text-purple-600">🗺️</span>
                            Choose your region &amp; district
                        </li>
                        <li className="flex items-center gap-2 text-lg">
                            <span role="img" aria-label="address" className="text-orange-500">📍</span>
                            Provide your valid address
                        </li>
                        <li className="flex items-center gap-2 text-lg">
                            <span role="img" aria-label="apply" className="text-cyan-600">✅</span>
                            Submit, and we’ll review your application
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default Rider;