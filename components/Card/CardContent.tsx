import { DetailedHTMLProps, HTMLAttributes } from "react";

const CardContent = ({
  children,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className="p-4" {...rest}>
      {children}
    </div>
  );
};

export default CardContent;
