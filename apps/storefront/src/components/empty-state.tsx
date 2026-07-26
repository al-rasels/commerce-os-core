import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'default',
  className,
}: EmptyStateProps) {
  const sizes = {
    sm: {
      wrapper: 'py-8',
      icon: 'size-8',
      title: 'text-sm',
      description: 'text-xs',
    },
    default: {
      wrapper: 'py-12',
      icon: 'size-12',
      title: 'text-base font-semibold',
      description: 'text-sm',
    },
    lg: {
      wrapper: 'py-16',
      icon: 'size-16',
      title: 'text-xl font-semibold',
      description: 'text-base',
    },
  };

  const s = sizes[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6',
        s.wrapper,
        className,
      )}
    >
      <div
        className={cn(
          'mb-4 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground/40',
          s.icon,
        )}
      >
        {icon || <PackageOpen className="size-full p-2.5" />}
      </div>
      <h3 className={cn('text-foreground', s.title)}>{title}</h3>
      {description && (
        <p className={cn('mt-1.5 text-muted-foreground max-w-sm', s.description)}>
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
