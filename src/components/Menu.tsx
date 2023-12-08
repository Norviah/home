import { config } from '@/config';
import { cn } from '@/utils/cn';

import type { Command } from '@/types/Config';
import type { ClassNameValue } from 'tailwind-merge';

export function Menu(props: { className?: ClassNameValue }): JSX.Element {
  const entries: [string, Command[]][] = Object.entries(config.links);

  return (
    <div className={cn('grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4', props.className)}>
      {entries.map(([category, commands]) => {
        return (
          <div key={category} className="flex flex-col gap-7">
            {commands.map((command: Command, index: number) => {
              return (
                <a
                  key={`${category}-${command.name}-${index}`}
                  href={command.url}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="flex gap-4">
                    <span className="text-foreground">{command.key}</span>
                    <span>{command.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
