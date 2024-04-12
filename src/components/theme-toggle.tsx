"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";

export function ThemeToggle() {
    const { setTheme, theme, themes } = useTheme();

    const themeIndex = useMemo(() => themes.indexOf(theme || "system"), [theme, themes]);

    return (
        <DropdownMenuItem
            className="flex justify-between"
            onClick={(e) => {
                e.preventDefault();

                setTheme(themeIndex + 1 >= themes.length ? themes[0] : themes[themeIndex + 1]);
            }}
        >
            <span>Theme:</span>
            <div className="flex items-center">
                <Sun className="h-4 w-4  scale-100 dark:scale-0 mr-1" />
                <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 mr-1" />
                {theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Dark"}
            </div>
        </DropdownMenuItem>
    );
}
