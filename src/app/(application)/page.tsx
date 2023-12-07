import { Menu } from '@/components/Menu';

export default function Home(): JSX.Element {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Menu />
      </div>
    </div>
  );
}
