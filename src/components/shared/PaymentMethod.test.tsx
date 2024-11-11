import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PaymentMethod from "./PaymentMethod";
import daviplata from "src/assets/daviplata.png";
import bancolombia from "src/assets/bancolombia.jpg";
import pse from "src/assets/pse.png";
import nequi from "src/assets/nequi.png";

describe("PaymentMethod component", () => {
  const transactionReference = 1234;

  it("renders DAVIPLATA payment method correctly", () => {
    render(
      <PaymentMethod
        paymentMethod="DAVIPLATA"
        transactionReference={transactionReference}
      />
    );
    expect(screen.getByAltText("Logo")).toHaveAttribute("src", daviplata);
    expect(screen.getByText("**** 1234")).toBeInTheDocument();
  });

  it("renders BANCOLOMBIA payment method correctly", () => {
    render(
      <PaymentMethod
        paymentMethod="BANCOLOMBIA"
        transactionReference={transactionReference}
      />
    );
    expect(screen.getByAltText("Logo")).toHaveAttribute("src", bancolombia);
    expect(screen.getByText("**** 1234")).toBeInTheDocument();
  });

  it("renders PSE payment method correctly", () => {
    render(
      <PaymentMethod
        paymentMethod="PSE"
        transactionReference={transactionReference}
      />
    );
    expect(screen.getByAltText("Logo")).toHaveAttribute("src", pse);
    expect(screen.getByText("PSE")).toBeInTheDocument();
  });

  it("renders NEQUI payment method correctly", () => {
    render(
      <PaymentMethod
        paymentMethod="NEQUI"
        transactionReference={transactionReference}
      />
    );
    expect(screen.getByAltText("Logo")).toHaveAttribute("src", nequi);
    expect(screen.getByText("**** 1234")).toBeInTheDocument();
  });

  it("renders default payment method correctly", () => {
    render(
      <PaymentMethod
        paymentMethod="OTHER"
        transactionReference={transactionReference}
      />
    );
    expect(screen.queryByAltText("Logo")).not.toBeInTheDocument();
    expect(screen.getByText("OTHER 1234")).toBeInTheDocument();
  });
});
