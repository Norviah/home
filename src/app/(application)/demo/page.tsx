'use client';

import Image from 'next/image';

import { ThemeSelector } from '@/components/ThemeSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Blockquote } from '@/components/ui/Blockquote';
import { Button, IconButton, buttonVariants } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { HoverCard } from '@/components/ui/HoverCard';
import { Separator } from '@/components/ui/Separator';
import { Switch } from '@/components/ui/Switch';
import { UnorderedList } from '@/components/ui/UnorderedList';
import {
  BellRingIcon,
  CheckIcon,
  ChevronDownIcon,
  GithubIcon,
  Search,
  SearchIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';

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

      <CardContent className='grid gap-4'>
        <div className=' flex items-center space-x-4 rounded-md border p-4'>
          <BellRingIcon />
          <div className='flex-1 space-y-1'>
            <p className='font-medium text-sm leading-none'>Push Notifications</p>
            <p className='text-card-muted text-sm'>Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
            >
              <span className='flex h-2 w-2 translate-y-1 rounded-full bg-success' />
              <div className='space-y-1'>
                <p className='font-medium text-sm leading-none'>{notification.title}</p>
                <p className='text-card-muted text-sm'>{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>
          <CheckIcon className='mr-2 h-4 w-4' /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

function CardDemo2({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <Image
        src='https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8'
        alt='A dog'
        width={500}
        height={500}
        unoptimized
        className='rounded-t-md'
      />
      <CardHeader>
        <CardTitle>Arctic</CardTitle>
      </CardHeader>
      <CardContent className='grid'>
        <p className='text-muted-foreground text-sm'>
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat
          maximus blandit. Duis viverra fringilla imperdiet. Proin efficitur euismod sapien, eu
          dictum orci rutrum eget.
        </p>
      </CardContent>
      <Separator className='mb-5' />
      <CardFooter>
        <Button className='w-full'>
          <CheckIcon className='mr-2 h-4 w-4' /> Mark all as read
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
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <br />
        <CardDemo />
        <br />
        <CardDemo2 />
        <br />
        <ThemeSelector />
        <div className='mt-5 mb-5'>
          <Button variant='ghost'>
            MENU
            <ChevronDownIcon
              className='relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180'
              aria-hidden='true'
            />
          </Button>
        </div>
        <UnorderedList>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </UnorderedList>
        <div className='grid grid-cols-5 gap-5'>
          <Button
            variant='default'
            onClick={() => {
              toast.message('Title', {
                description: 'Description',
                action: {
                  label: 'Action',
                  onClick: () => console.log('Action!'),
                },
              });
            }}
          >
            Button
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              toast.info('Info', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='info'
            onClick={() => {
              toast.info('Info', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='destructive'
            onClick={() => {
              toast.error('Error', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='success'
            onClick={() => {
              toast.success('Success', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='warn'
            onClick={() => {
              toast.warning('Warning', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button variant='ghost'>Button</Button>
          <Button variant='link'>Button</Button>
          <Button variant='outline'>Button</Button>
        </div>

        <div className='m-10 flex w-full justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='focus:outline-none'>
              <Button variant='outline'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='mb-10'>
          <Blockquote>
            {
              "After all, everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
            }
          </Blockquote>
        </div>
        <CodeBlock>#include {'<stdio.h>'}</CodeBlock>
        <div>
          Lorem ipsum dolor sit amet, consectetur <HoverCard /> elit. Maecenas molestie pellentesque
          ipsum. Ut id convallis nisi. Aliquam feugiat maximus blandit. Duis viverra fringilla
          imperdiet. Proin efficitur euismod sapien, eu dictum orci rutrum eget. ipsum. Ut id
          convallis nisi. Aliquam feugiat maximus blandit. Duis viverra fringilla imperdiet. Proin
          efficitur euismod sapien, eu dictum orci rutrum eget.
        </div>
        <p className='text-muted-foreground text-sm'>
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat
          maximus blandit. Duis viverra fringilla imperdiet. Proin efficitur euismod sapien, eu
          dictum orci rutrum eget.
        </p>
      </span>
    </>
  );
}
