import { type ReactNode } from "react";
import { Alert } from "react-bootstrap";

export interface IMessageProps {
  variant: string;
  children: ReactNode;
}

const Message = ({ variant, children }: IMessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
