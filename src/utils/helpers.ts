import { UiButtonStyleProps } from "../types/types";

export const getBackgroundColor = (props: UiButtonStyleProps) => {
  return props.variant === "contained" ? "#8A2B06" : "#fff";
};

export const getBorderRadius = (props: UiButtonStyleProps) => {
  return props.borderRadius === "rounded" ? "20px" : "6px";
};

export const getColor = (props: UiButtonStyleProps) => {
  return props.variant === "contained" ? "#fff" : "#9b3107";
};

export const getBorder = (props: UiButtonStyleProps) => {
  return props.variant === "contained" ? "none" : "1px solid #9b3107";
};
