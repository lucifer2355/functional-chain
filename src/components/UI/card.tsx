import { cn } from "../../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={cn(
        `border border-[#DFDFDF] rounded-[.9375rem] shadow-lg w-[15.625rem] min-h-[15.6875rem] flex flex-col`,
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-4 pt-4", className)}>{children}</div>;
};

Card.Body = function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4 flex-grow", className)}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-4 pb-4 mt-auto", className)}>{children}</div>;
};
