import Script from "next/script";

export default function GitHubCalendar({ username = "imananoosheh" }) {

    return (
        <div className="my-8 w-full flex flex-col items-center bg-stone-500 py-8">
            <Script
                src="https://cdn.jsdelivr.net/gh/imananoosheh/github-contributions-fetch@latest/github_calendar_widget.js"
                strategy="lazyOnload"
            />
            <div className="sm:scale-65 md:scale-80" id="calendar-component" username={username} background-color="#79716b" theme-color="#f5f5f4"></div>
        </div>
    );
}