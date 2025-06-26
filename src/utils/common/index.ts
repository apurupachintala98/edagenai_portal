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
  }else if (str === "staff vp" || str === "lead nm" || str === "llm platform" || str === "llm model" || str === "bu"){
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
  }

  return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}


export function convertDateFormate(dateTime: Date): string {
  if (!dateTime) {
    return "";
  }
  const date = new Date(dateTime);

  // Extract local date parts
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const finalDateTime = `${mm}/${dd}/${yyyy}`;

  return finalDateTime;
}