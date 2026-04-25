import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 focus-visible:ring-sky-500',
                secondary: 'bg-white/80 px-4 py-2 text-slate-900 ring-1 ring-slate-200 hover:bg-white focus-visible:ring-slate-400',
                ghost: 'px-3 py-2 text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export function Button({ className, variant, ...props }) {
    return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
