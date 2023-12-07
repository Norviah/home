'use client';

import Image from 'next/image';

import { ThemeSelector } from '@/components/ThemeSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { HoverCard } from '@/components/ui/HoverCard';
import { Separator } from '@/components/ui/Separator';
import { Switch } from '@/components/ui/Switch';
import { Blockquote } from '@/components/ui/typography/Blockquote';
import { CodeBlock } from '@/components/ui/typography/CodeBlock';
import { UnorderedList } from '@/components/ui/typography/UnorderedList';
import { BellRingIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

type CardProps = React.ComponentProps<typeof Card>;

function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRingIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-nord-green" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

function CardDemo2({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <Image
        src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8"
        alt="A dog"
        width={500}
        height={500}
        unoptimized
      />
      <CardHeader>
        <CardTitle>Arctic</CardTitle>
      </CardHeader>
      <CardContent className="grid">
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat maximus blandit. Duis viverra
          fringilla imperdiet. Proin efficitur euismod sapien, eu dictum orci rutrum eget.
        </p>
      </CardContent>
      <Separator className="mb-5" />
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home(): JSX.Element {
  return (
    <>
      <span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <br />
        <CardDemo />
        <br />
        <CardDemo2 />
        <br />
        <ThemeSelector />

        <div className="mb-5 mt-5">
          <Button variant="ghost">
            MENU
            <ChevronDownIcon
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Button>
        </div>
        <UnorderedList>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </UnorderedList>
        <div className="grid grid-cols-5 gap-5">
          <Button variant="default">Button</Button>
          <Button variant="secondary">Button</Button>
          <Button variant="destructive">Button</Button>
          <Button variant="success">Button</Button>
          <Button variant="warn">Button</Button>
          <Button variant="ghost">Button</Button>
          <Button variant="link">Button</Button>
          <Button variant="outline">Button</Button>
        </div>
        <div className="mb-10">
          <Blockquote>
            {"After all, everyone enjoys a good joke, so it's only fair that they should pay for the privilege."}
          </Blockquote>
        </div>
        <CodeBlock>#include {'<stdio.h>'}</CodeBlock>
        <div>
          Lorem ipsum dolor sit amet, consectetur <HoverCard /> elit. Maecenas molestie pellentesque ipsum. Ut id convallis
          nisi. Aliquam feugiat maximus blandit. Duis viverra fringilla imperdiet. Proin efficitur euismod sapien, eu dictum
          orci rutrum eget. ipsum. Ut id convallis nisi. Aliquam feugiat maximus blandit. Duis viverra fringilla imperdiet.
          Proin efficitur euismod sapien, eu dictum orci rutrum eget.
        </div>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat maximus blandit. Duis viverra
          fringilla imperdiet. Proin efficitur euismod sapien, eu dictum orci rutrum eget.
        </p>
      </span>
    </>
  );
}
