import React from "react";
import { useSelector } from "react-redux";

function Footer() {
  const theme = useSelector((state) => state.weather.theme);
  return (
    <div className={`footer bottom-0 ${theme && "dark-mode-2"}`}>
      made with{" "}
      <svg
        viewBox="0 0 512 512"
        focusable="false"
        fill="#497BCD"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
      >
        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
      </svg>{" "}
      by{" "}
      <a
        href="https://github.com/emirhancirmencik"
        className="text-decoration-none footer-text"
      >
        {" "}
        emirhan cirmencik
      </a>
    </div>
  );
}

export default Footer;
