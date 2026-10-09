import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Home from "./page";
import { describe, expect, it } from "vitest";
describe("Home", () => { it("exibe o título", () => { render(<Home />); expect(screen.getByRole("heading", { name: /visão gerencial centralizada/i })).toBeInTheDocument(); }); });
