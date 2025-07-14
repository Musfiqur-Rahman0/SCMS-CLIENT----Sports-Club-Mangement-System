import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import cardImage from "../../../src/assets/Images/aboutImage.jpeg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CourtCard = () => {
  return (
    <Card>
      <Avatar>
        <AvatarImage src={cardImage} alt="court image" />
        <AvatarFallback>Court image</AvatarFallback>
      </Avatar>
      <CardContent>
        <div className="flex items-center justify-between">
          <CardTitle className={"text-xl font-bold"}>
            Abu saiyed Footbal Club
          </CardTitle>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tennis">9-10AM</SelectItem>
              <SelectItem value="Badminton">10.15-11AM</SelectItem>
              <SelectItem value="Football">11.15-12AM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourtCard;
