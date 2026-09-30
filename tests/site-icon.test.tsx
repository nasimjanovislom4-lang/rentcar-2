import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import SiteIcon from "../components/SiteIcon";

describe("SiteIcon", () => {
  it("renders a locally bundled decorative icon with its requested size", () => {
    const markup = renderToStaticMarkup(createElement(SiteIcon, { name: "car", size: 24 }));

    expect(markup).toContain("<svg");
    expect(markup).toContain('width="24"');
    expect(markup).toContain('height="24"');
    expect(markup).toContain('aria-hidden="true"');
  });
});