import { auth } from "@/lib/auth";
import { Quote } from "lucide-react";

const PROVERBS = [
    "The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction. - Proverbs 1:7",
    "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight. - Proverbs 3:5-6",
    "Above all else, guard your heart, for everything you do flows from it. - Proverbs 4:23",
    "Commit to the LORD whatever you do, and he will establish your plans. - Proverbs 16:3",
    "A friend loves at all times, and a brother is born for a time of adversity. - Proverbs 17:17",
    "The name of the LORD is a fortified tower; the righteous run to it and are safe. - Proverbs 18:10",
    "Listen to advice and accept discipline, and at the end you will be counted among the wise. - Proverbs 19:20",
    "Start children off on the way they should go, and even when they are old they will not turn from it. - Proverbs 22:6",
    "As iron sharpens iron, so one person sharpens another. - Proverbs 27:17",
    "She helps the poor and the needy. - Proverbs 31:20",
    "Charm is deceptive, and beauty is fleeting; but a woman who fears the LORD is to be praised. - Proverbs 31:30",
    "Honor the LORD with your wealth, with the firstfruits of all your crops. - Proverbs 3:9",
    "Do not withhold good from those to whom it is due, when it is in your power to act. - Proverbs 3:27",
    "For the LORD gives wisdom; from his mouth come knowledge and understanding. - Proverbs 2:6",
    "A gentle answer turns away wrath, but a harsh word stirs up anger. - Proverbs 15:1",
    "Pride goes before destruction, a haughty spirit before a fall. - Proverbs 16:18",
    "The heart of man plans his way, but the LORD establishes his steps. - Proverbs 16:9",
    "He who walks with the wise grows wise, but a companion of fools suffers harm. - Proverbs 13:20",
    "A generous person will prosper; whoever refreshes others will be refreshed. - Proverbs 11:25",
    "The plans of the diligent lead to profit as surely as haste leads to poverty. - Proverbs 21:5"
];

const ALLOWED_EMAILS = [
    "giovannitc88@gmail.com",
    "kkewalram777@gmail.com"
];

export default async function DailyProverb() {
    const session = await auth();

    if (!session?.user?.email || !ALLOWED_EMAILS.includes(session.user.email)) {
        return null;
    }

    // Pick a random proverb based on the date to make it consistent for the day (Daily Proverb)
    // Or just purely random as requested "random for each time the user logs in"
    // The request said "random for each time the user logs in", which usually implies dynamic refreshing.
    // Since this is a server component, it will re-render on page load/refresh.
    const randomIndex = Math.floor(Math.random() * PROVERBS.length);
    const proverb = PROVERBS[randomIndex];
    const [text, verse] = proverb.split(" - ");

    return (
        <div className="hidden xl:flex items-center max-w-lg animate-fade-in mr-auto">
            <div className="kk-glass-strong rounded-2xl p-3 md:p-4 flex gap-4 border border-[#E6E0F2]/50 shadow-sm backdrop-blur-md bg-white/40 hover:bg-white/60 transition-colors duration-500">
                <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-[#9F8FEF]/15 flex items-center justify-center text-[#7C3AED]">
                        <Quote size={14} className="fill-current" />
                    </div>
                </div>
                <div>
                    <p className="text-[#3F3A52] text-sm md:text-[15px] font-medium leading-relaxed font-serif italic">
                        "{text}"
                    </p>
                    <p className="text-[#6B647F] text-xs font-bold mt-2 uppercase tracking-wide">
                        — {verse}
                    </p>
                </div>
            </div>
        </div>
    );
}
