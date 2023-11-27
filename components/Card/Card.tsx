import { ReactNode } from "react";
import CardContent from "./CardContent";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden">
      {children}
    </div>
  );
};

Card.Content = CardContent;

export default Card;
