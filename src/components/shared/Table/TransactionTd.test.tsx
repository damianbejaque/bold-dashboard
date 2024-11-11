import { render } from "@testing-library/react";
import TransactionTd from "./TransactionTd";
import { Status } from "../../../types/myBussiness";
import { transactionStatus } from "../../../utils/utils";

describe("TransactionTd", () => {
  it("renders the PiLink icon when salesType is PAYMENT_LINK", () => {
    const { container } = render(
      <TransactionTd status={Status.REJECTED} salesType="PAYMENT_LINK" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the PiContactlessPaymentLight icon when salesType is TERMINAL", () => {
    const { container } = render(
      <TransactionTd status={Status.SUCCESSFUL} salesType="TERMINAL" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("displays the correct transaction status text", () => {
    const { getByText } = render(
      <TransactionTd status={Status.SUCCESSFUL} salesType="TERMINAL" />
    );
    expect(getByText(transactionStatus(Status.SUCCESSFUL))).toBeInTheDocument();
  });
});
