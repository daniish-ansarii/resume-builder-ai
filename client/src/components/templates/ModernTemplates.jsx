import React from "react";
import ResumeContactLinks from "./ResumeContactLinks";
import ResumePublications from "./ResumePublications";

const dateLabel = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    return month ? new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : value;
};

const ContactDetails = ({ info, light = false, stacked = false }) => {
    return <ResumeContactLinks info={info} className={`flex ${stacked ? "flex-col" : "flex-wrap"} gap-x-4 gap-y-2 text-xs ${light ? "text-white/85" : "text-slate-600"}`} iconClassName="size-3.5" linkClassName={light ? "hover:text-white" : "hover:text-slate-900"}/>;
};

const Section = ({ title, accent, children, className = "" }) => <section className={`mb-5 ${className}`}>
    <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-800" style={{ borderColor: accent }}>{title}</h2>
    {children}
</section>;

const Summary = ({ data }) => data.professional_summary && <p className="text-[13px] leading-[1.65] text-slate-700">{data.professional_summary}</p>;

const Experience = ({ items = [], accent, compact = false }) => <div className={compact ? "space-y-3" : "space-y-4"}>
    {items.map((item, index) => <article key={`${item.company}-${item.position}-${index}`} className="break-inside-avoid">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <h3 className="text-sm font-semibold text-slate-900">{item.position || "Position"}</h3>
            <span className="text-[10px] text-slate-500">{dateLabel(item.start_date)}{item.start_date ? " – " : ""}{item.is_current ? "Present" : dateLabel(item.end_date)}</span>
        </div>
        <p className="text-xs font-medium" style={{ color: accent }}>{item.company}</p>
        {item.description && <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-slate-600">{item.description}</p>}
    </article>)}
</div>;

const Education = ({ items = [], accent, compact = false }) => <div className={compact ? "space-y-2" : "space-y-3"}>
    {items.map((item, index) => <article key={`${item.institution}-${index}`} className="break-inside-avoid">
        <h3 className="text-xs font-semibold text-slate-800">{item.degree}{item.field ? ` · ${item.field}` : ""}</h3>
        <p className="text-xs" style={{ color: accent }}>{item.institution}</p>
        <p className="text-[10px] text-slate-500">{dateLabel(item.graduation_date)}{item.gpa ? ` · GPA ${item.gpa}` : ""}</p>
    </article>)}
</div>;

const Skills = ({ items = [], accent, pills = false }) => <div className={pills ? "flex flex-wrap gap-1.5" : "flex flex-wrap gap-x-3 gap-y-1"}>
    {items.map((skill, index) => <span key={`${skill}-${index}`} className={pills ? "rounded-full px-2.5 py-1 text-[10px] font-medium" : "text-xs text-slate-700"}
        style={pills ? { color: accent, backgroundColor: `${accent}14` } : undefined}>{!pills && <span style={{ color: accent }}>• </span>}{skill}</span>)}
</div>;

const Projects = ({ items = [], accent }) => <div className="space-y-3">
    {items.map((item, index) => <article key={`${item.name}-${index}`} className="break-inside-avoid">
        <h3 className="text-xs font-semibold text-slate-800">{item.name}</h3>
        {item.type && <p className="text-[10px] font-medium" style={{ color: accent }}>{item.type}</p>}
        {item.description && <p className="mt-0.5 whitespace-pre-line text-xs leading-relaxed text-slate-600">{item.description}</p>}
    </article>)}
</div>;

const ModernTemplates = ({ data, accentColor, variant }) => {
    const info = data.personal_info || {};
    const accent = accentColor || "#2563eb";
    const name = info.full_name || "Your Name";
    const profession = info.profession || "Professional Title";
    const experience = <Experience items={data.experience} accent={accent} />;
    const summary = <Summary data={data} />;
    const skills = <Skills items={data.skills} accent={accent} pills={variant === "tech" || variant === "creative"} />;
    const projects = <Projects items={data.project} accent={accent} />;
    const publications = <ResumePublications items={data.publications} accentColor={accent} className="mb-5" headingClassName="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-800"/>;
    const education = <Education items={data.education} accent={accent} />;

    if (variant === "sidebar") return <div className="mx-auto grid min-h-[1056px] max-w-4xl grid-cols-[30%_70%] bg-white text-slate-800 max-sm:grid-cols-1">
        <aside className="p-7 text-white" style={{ backgroundColor: "#172554" }}>
            <div className="mb-7 border-b border-white/20 pb-6">
                <div className="mb-3 h-1 w-12 rounded" style={{ backgroundColor: accent }}/>
                <h1 className="text-2xl font-bold leading-tight">{name}</h1><p className="mt-2 text-sm text-white/70">{profession}</p>
            </div>
            <div className="mb-7"><ContactDetails info={info} light stacked/></div>
            {data.education?.length > 0 && <div className="mb-7"><h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/65">Education</h2><Education items={data.education} accent="#bfdbfe"/></div>}
            {data.skills?.length > 0 && <div><h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/65">Skills</h2><div className="flex flex-wrap gap-2">{data.skills.map((skill, index) => <span key={`${skill}-${index}`} className="rounded border border-white/20 px-2 py-1 text-[10px] text-white/90">{skill}</span>)}</div></div>}
        </aside>
        <main className="p-8 sm:p-10">
            {data.professional_summary && <Section title="Profile" accent={accent}>{summary}</Section>}
            {data.experience?.length > 0 && <Section title="Experience" accent={accent}>{experience}</Section>}
            {data.publications?.length > 0 && publications}
            {data.project?.length > 0 && <Section title="Selected Projects" accent={accent}>{projects}</Section>}
        </main>
    </div>;

    if (variant === "tech") return <div className="mx-auto min-h-[1056px] max-w-4xl bg-white p-8 text-slate-800 sm:p-10">
        <header className="relative mb-7 overflow-hidden rounded-xl bg-slate-950 px-7 py-8 text-white">
            <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: accent }}/>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">{profession}</p>
            <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
            <div className="mt-5"><ContactDetails info={info} light/></div>
        </header>
        {data.professional_summary && <Section title="Profile" accent={accent}>{summary}</Section>}
        {data.experience?.length > 0 && <Section title="Experience" accent={accent}>{experience}</Section>}
        {data.publications?.length > 0 && publications}
        <div className="grid gap-7 sm:grid-cols-2">
            {data.project?.length > 0 && <Section title="Projects" accent={accent}>{projects}</Section>}
            {data.skills?.length > 0 && <Section title="Toolkit" accent={accent}>{skills}</Section>}
            {data.education?.length > 0 && <Section title="Education" accent={accent}>{education}</Section>}
        </div>
    </div>;

    if (variant === "compact") return <div className="mx-auto min-h-[1056px] max-w-4xl bg-white px-10 py-9 text-slate-800">
        <header className="mb-5 border-b-2 pb-4" style={{ borderColor: accent }}>
            <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-3xl font-bold tracking-tight">{name}</h1><p className="mt-1 text-sm font-medium" style={{ color: accent }}>{profession}</p></div><div className="max-w-[55%]"><ContactDetails info={info}/></div></div>
        </header>
        {data.professional_summary && <Section title="Summary" accent={accent} className="mb-4">{summary}</Section>}
        {data.experience?.length > 0 && <Section title="Professional Experience" accent={accent} className="mb-4"><Experience items={data.experience} accent={accent} compact/></Section>}
        {data.publications?.length > 0 && publications}
        <div className="grid gap-6 sm:grid-cols-2">
            {data.education?.length > 0 && <Section title="Education" accent={accent}>{education}</Section>}
            {data.skills?.length > 0 && <Section title="Skills" accent={accent}>{skills}</Section>}
        </div>
        {data.project?.length > 0 && <Section title="Projects" accent={accent}>{projects}</Section>}
    </div>;

    if (variant === "creative") return <div className="mx-auto min-h-[1056px] max-w-4xl bg-white p-8 text-slate-800 sm:p-10">
        <header className="mb-8 grid gap-5 border-b pb-6 sm:grid-cols-[1fr_auto] sm:items-end" style={{ borderColor: `${accent}50` }}>
            <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>Portfolio / Resume</p><h1 className="text-4xl font-bold leading-none tracking-tight">{name}</h1><p className="mt-3 text-base text-slate-500">{profession}</p></div>
            <ContactDetails info={info} stacked/>
        </header>
        <div className="grid gap-8 sm:grid-cols-[1fr_2fr]">
            <aside>
                {data.professional_summary && <Section title="About" accent={accent}>{summary}</Section>}
                {data.skills?.length > 0 && <Section title="Strengths" accent={accent}>{skills}</Section>}
                {data.education?.length > 0 && <Section title="Education" accent={accent}>{education}</Section>}
            </aside>
            <main className="border-l-2 pl-6" style={{ borderColor: `${accent}30` }}>
                {data.experience?.length > 0 && <Section title="Experience" accent={accent}>{experience}</Section>}
                {data.publications?.length > 0 && publications}
                {data.project?.length > 0 && <Section title="Projects" accent={accent}>{projects}</Section>}
            </main>
        </div>
    </div>;

    if (variant === "elegant") return <div className="mx-auto min-h-[1056px] max-w-4xl bg-white px-10 py-11 text-slate-800 sm:px-14">
        <header className="mb-8 text-center">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em]" style={{ color: accent }}>{profession}</p>
            <h1 className="font-serif text-4xl tracking-wide">{name}</h1>
            <div className="mx-auto my-4 h-px w-16" style={{ backgroundColor: accent }}/>
            <div className="justify-center"><ContactDetails info={info}/></div>
        </header>
        {data.professional_summary && <Section title="Profile" accent={accent}>{summary}</Section>}
        {data.experience?.length > 0 && <Section title="Experience" accent={accent}>{experience}</Section>}
        {data.publications?.length > 0 && publications}
        <div className="grid gap-7 sm:grid-cols-2">
            {data.education?.length > 0 && <Section title="Education" accent={accent}>{education}</Section>}
            {data.skills?.length > 0 && <Section title="Expertise" accent={accent}>{skills}</Section>}
        </div>
        {data.project?.length > 0 && <Section title="Selected Work" accent={accent}>{projects}</Section>}
    </div>;

    return <div className="mx-auto min-h-[1056px] max-w-4xl bg-white p-8 text-slate-800 sm:p-11">
        <header className="mb-7 rounded-r-xl border-l-4 bg-slate-50 px-6 py-6" style={{ borderColor: accent }}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>{profession}</p>
            <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
            <div className="mt-4"><ContactDetails info={info}/></div>
        </header>
        {data.professional_summary && <Section title="Executive Profile" accent={accent}>{summary}</Section>}
        {data.experience?.length > 0 && <Section title="Career History" accent={accent}>{experience}</Section>}
        {data.publications?.length > 0 && publications}
        <div className="grid gap-7 sm:grid-cols-2">
            {data.education?.length > 0 && <Section title="Education" accent={accent}>{education}</Section>}
            {data.skills?.length > 0 && <Section title="Core Competencies" accent={accent}>{skills}</Section>}
        </div>
        {data.project?.length > 0 && <Section title="Key Projects" accent={accent}>{projects}</Section>}
    </div>;
};

export default ModernTemplates;
