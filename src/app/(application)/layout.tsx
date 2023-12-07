import type { LayoutProps } from '@/types/components/LayoutProps';

export default function DashboardLayout(props: LayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <main className="container">{props.children}</main>
    </div>
  );
}
