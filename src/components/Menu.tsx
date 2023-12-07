import { config } from '@/config';
import type { Command } from '@/types/Config';

export function Menu(): JSX.Element {
  const entries: [string, Command[]][] = Object.entries(config.links);

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
      {entries.map(([category, commands]) => {
        return (
          <div key={category} className="flex flex-col gap-7">
            {commands.map((command: Command, index: number) => {
              return (
                <a key={`${category}-${command.name}-${index}`} href={command.url}>
                  <div className="flex gap-4 text-sm">
                    <span className="text-foreground">{command.key}</span>
                    <span className="text-muted-foreground transition-colors hover:text-foreground">{command.name}</span>
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
