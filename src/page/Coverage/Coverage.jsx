import React, { useRef } from 'react'
import { Marker, TileLayer, Popup, MapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router'

export default function Coverage() {

    const servicesCenter = useLoaderData();
    const position = [23.8103, 90.4125];

    const mapRef=useRef(null);

   const hendleSubmit = (event) => {
  event.preventDefault();
  const location = event.target.location.value;

  const district = servicesCenter.find(item =>
    item.district.toLowerCase().includes(location.toLowerCase())
  );

  if (district) {
    const coord = [district.latitude, district.longitude];
    mapRef.current.flyTo(coord, 13);
  } else {
    console.log("District not found");
  }
};


    return (
        <div className='bg-white rounded-2xl p-5 md:p-10 my-10 min-h-[500px] '>
            <p className='text-2xl sm:text-3xl md:text-4xl font-bold'>We are available in 64 districts</p>

            <div className='my-5 md:my-10'>

                <form onSubmit={hendleSubmit}>
                    <div className="join">
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" name="location" required placeholder="Search" />
                        </label>
                        <input className='bg-[#caeb66] text-black btn' type="submit" value="Search" />

                    </div>
                </form>


            </div>
              

              <p className='font-bold text-lg md:text-2xl mb-5 mt-10'>We deliver almost all over Bangladesh</p>

            <div className=' w-full h-[200px]  md:h-[400px] '>
                <MapContainer center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='w-full h-[200px] md:h-[400px]'
                    ref={mapRef}
                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        servicesCenter.map(center => <Marker position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong><br /> Service Areas : {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>
            </div>


        </div>
    )
}
