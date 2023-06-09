import Switch from "@mui/material/Switch";
import { useContext, useEffect } from "react";
import { GeneralContext } from "@/context/generalContext";
import { IGeneralContext } from "@/context/interface";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";

export default function DarkModeSwitch() {
  const { isDarkMode, updateDarkMode } = useContext(
    GeneralContext
  ) as IGeneralContext;

  useEffect(() => {
    let isOSDarkMode;
    if (typeof window !== "undefined") {
      // check if window is defined
      isOSDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isOSDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      updateDarkMode(isOSDarkMode);
    }
  }, [updateDarkMode]);

  function toggleDarkMode() {
    console.log("toggleDarkMode", !isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    updateDarkMode(!isDarkMode);
  }

  return (
    <div className="absolute right-10 top-3 flex z-50">
      <BsFillMoonStarsFill className="xl:text-gray-900 dark:text-gray-100  text-gray-100 mt-3" />
      <Switch
        id="switch1"
        checked={!isDarkMode}
        onClick={() => toggleDarkMode()}
        className="dark:text-gray-300"
      />
      <BsFillSunFill className="text-yellow-700 mt-3" />
    </div>
  );
}
