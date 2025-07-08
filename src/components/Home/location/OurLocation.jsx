import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Swal from "sweetalert2";

const clubLat = 23.8103; // Example: Dhaka
const clubLng = 90.4125;

function FlyToLocation({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10);
  }
  return null;
}

export default function OurLocation() {
  const [search, setSearch] = useState("");
  const [searchPos, setSearchPos] = useState(null);
  const [distance, setDistance] = useState(null);

  const handleSearch = async () => {
    if (!search) return;

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        search
      )}&format=json&limit=1`
    );

    if (res.data && res.data.length > 0) {
      const { lat, lon } = res.data[0];
      setSearchPos([lat, lon]);
    } else {
      Swal.fire("city not found");
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Find Us On</h2>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for a place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 flex-1 rounded-l"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded-r"
          >
            Search
          </button>
        </div>

        <MapContainer
          center={[clubLat, clubLng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Club Marker */}
          <Marker position={[clubLat, clubLng]}>
            <Popup>Your Sports Club</Popup>
          </Marker>

          {/* Search Marker */}
          {searchPos && (
            <Marker position={searchPos}>
              <Popup>
                Searched Location
                <br />
                {distance && `Distance: ${distance} km`}
              </Popup>
            </Marker>
          )}

          <FlyToLocation position={searchPos} />
        </MapContainer>
      </div>
    </section>
  );
}
