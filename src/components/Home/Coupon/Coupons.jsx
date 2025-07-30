import React from "react";
import useCurd from "@/Hooks/useCurd";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Coupons() {
  const {
    data: coupons = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axios.get("https://a12-server-rho.vercel.app/coupons");
      return res.data;
    },
  });

  console.log(coupons);

  if (isPending) return <p>Loading coupons data...</p>;
  if (isError) return <p>Failed to load coupons.</p>;

  return (
    <section className="p-6 mb-20 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 Active Coupons</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {coupons?.map((coupon) => (
          <div
            key={coupon?._id}
            className="border border-dashed border-primary rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-50 to-white"
          >
            <h3 className="text-lg font-bold mb-2">{coupon?.code}</h3>
            <p className="text-sm text-gray-700 mb-2">
              {coupon?.discountType === "percentage"
                ? `${coupon?.discountValue}% OFF`
                : `Save $${coupon?.discountValue}`}
            </p>
            {coupon.description && (
              <p className="text-xs text-gray-500">{coupon?.description}</p>
            )}
            <Link
              to={"/courts"}
              className="inline-block mt-3 px-3 py-1 bg-primary text-white text-xs rounded"
            >
              Use Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
