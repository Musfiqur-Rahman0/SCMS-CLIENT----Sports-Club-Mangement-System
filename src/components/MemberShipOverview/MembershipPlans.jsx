import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const membershipPlans = [
  {
    title: "Basic",
    price: "$19/mo",
    description:
      "Perfect for casual players who want occasional access to facilities.",
    features: [
      "Access to 2 sports",
      "Standard booking priority",
      "Community events",
    ],
  },
  {
    title: "Standard",
    price: "$39/mo",
    description:
      "Great for regular players with extra perks and better booking priority.",
    features: [
      "Access to 5 sports",
      "Priority booking",
      "Discounted coaching sessions",
      "Free club T-shirt",
    ],
  },
  {
    title: "Premium",
    price: "$69/mo",
    description:
      "For dedicated members who want full access and exclusive privileges.",
    features: [
      "Unlimited sports access",
      "VIP booking priority",
      "Free personal training",
      "Exclusive tournaments",
    ],
  },
];

export default function MembershipPlans() {
  const navigate = useNavigate();

  const hanldeJoinNow = () => {
    navigate("/courts");
    Swal.fire(
      "Membership info",
      "Please book a court and you will became a member after admin approval",
      "info"
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=" mb-12"
        >
          <h2 className="title">Membership Plans</h2>
          <p className="mt-2 subtitle">Choose the plan that fits your game.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.01,
                // boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white py-5 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {plan.title}
                  </CardTitle>
                  <p className="text-3xl font-bold ">{plan.price}</p>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-700"
                      >
                        <TiTick /> <span className="ml-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={hanldeJoinNow}
                    className="w-full  text-white rounded-full"
                  >
                    Join Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
