import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CourtCard = ({ court, setSelectedCourt }) => {
  return (
    <Card
      key={court._id}
      className="w-full max-w-md mx-auto flex flex-col overflow-hidden"
    >
      <CardHeader className="p-0">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <CardTitle className="text-xl font-bold">{court.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {court.description}
        </CardDescription>

        <div className="text-sm text-muted-foreground">
          <p>
            <span className="font-medium">Type:</span> {court.type}
          </p>
          <p>
            <span className="font-medium">Location:</span> {court.location}
          </p>
          <p>
            <span className="font-medium">Capacity:</span> {court.capacity}
          </p>

          <p>
            <span className="font-medium">Price:</span> ${court.price} per
            session
          </p>
          <p>
            <span className="font-medium">Deadline:</span>{" "}
            {new Date(court.deadline).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" onClick={() => setSelectedCourt(court)}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourtCard;
