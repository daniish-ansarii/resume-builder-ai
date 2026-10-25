import React from "react";
import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getContactHref } from "../../utils/resumeLinks";

const contactItems = [
    ["email", Mail],
    ["phone", Phone],
    ["location", MapPin],
    ["linkedin", Linkedin],
    ["website", Globe],
];

const ResumeContactLinks = ({ info, className = "", itemClassName = "", iconClassName = "size-4", linkClassName = "" }) => (
    <div className={className}>
        {contactItems.map(([field, Icon]) => {
            const value = info?.[field];
            if (!value) return null;
            const href = getContactHref(field, value);
            const content = <>{React.createElement(Icon, {className: `shrink-0 ${iconClassName}`})}<span className="break-all">{value}</span></>;
            const commonClassName = `flex min-w-0 items-center gap-1.5 ${itemClassName} ${href ? `cursor-pointer transition hover:underline focus-visible:underline ${linkClassName}` : ""}`;

            return href ? <a key={field} href={href} className={commonClassName} target={field === "website" || field === "linkedin" ? "_blank" : undefined} rel={field === "website" || field === "linkedin" ? "noopener noreferrer" : undefined}>
                {content}
            </a> : <span key={field} className={commonClassName}>{content}</span>;
        })}
    </div>
);

export default ResumeContactLinks;
