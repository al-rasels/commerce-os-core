import React from "react";

export interface CustomCodeHtmlProps {
  htmlCode?: string;
}

export const CustomCodeHtml: React.FC<CustomCodeHtmlProps> = ({
  htmlCode = "<!-- Custom embed snippet -->",
}) => {
  return (
    <div
      className="w-full py-4"
      dangerouslySetInnerHTML={{ __html: htmlCode }}
    />
  );
};
