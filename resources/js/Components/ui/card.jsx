import { cn } from '@/lib/utils';

export function Card({ className, ...props }) {
    return <div className={cn('rounded-3xl border border-slate-200 bg-white shadow-sm', className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
    return <div className={cn('space-y-1 p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
    return <h3 className={cn('text-lg font-semibold text-slate-950', className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
    return <p className={cn('text-sm text-slate-600', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
    return <div className={cn('p-6 pt-0', className)} {...props} />;
}
