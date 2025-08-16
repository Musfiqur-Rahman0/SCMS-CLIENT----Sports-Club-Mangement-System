import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className=" px-4">
        <h2 className="title mb-4">Find Us On</h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          <Input
            type="text"
            placeholder="Search for a place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="w-full sm:w-auto">
            Search
          </Button>
        </div>

        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle className="text-xl">Our Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <p>🏠 Address: 123 Sports Avenue, Dhaka, Bangladesh</p>
            <p>🕒 Hours: Mon - Fri, 8:00 AM - 10:00 PM</p>
            <p>📞 Contact: +880 1234-567890</p>
            <p>📧 Email: info@yoursportsclub.com</p>
          </CardContent>
        </Card>

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

          <Marker position={[clubLat, clubLng]}>
            <Popup>Your Sports Club</Popup>
          </Marker>

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
