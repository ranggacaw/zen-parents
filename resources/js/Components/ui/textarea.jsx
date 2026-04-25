import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }) {
    return (
        <textarea
            className={cn(
                'flex min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-400',
                className,
            )}
            {...props}
        />
    );
}
