import dayjs from "dayjs";
import { UserInfo } from "interface";

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const checkValidUserInfo = (obj: UserInfo) =>
  Object.keys(obj).length > 0 && obj.user.username !== "";

export function validateEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+?$/;
  return emailPattern.test(email);
}

export const size = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  mediumDesktop: "1920px",
  largeDesktop: "2560px",
};

export function capitalizeFirstLetterOfEachWord(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }else if (str === "staff vp" || str === "lead nm" || str === "llm platform" || str === "llm model" || str === "bu" || str === "tgov no"){
    if(str === "staff vp"){
      return "Staff VP";
    }
    if(str === "lead nm"){
      return "Lead";
    }
    if(str === "llm platform"){
      return "LLM Platform";
    }
    if(str === "llm model"){
      return "LLM Model";
    }
    if(str === "bu"){
      return "BU";
    }
    if(str === "tgov no"){
      return "TGOV No"
    }
  }

  return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}


export function convertDateFormate(dateTime: Date): string {
  if (!dateTime) {
    return "";
  }
  const finalDateTime = dayjs(dateTime).format("MM/DD/YYYY")
  return finalDateTime;
}