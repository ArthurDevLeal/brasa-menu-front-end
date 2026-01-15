import { ChildrenType } from "@/types/children-type";
import { Layout } from ".";
import { Header } from "./header";
interface LayoutRootProps {
  children: ChildrenType;
  title: string;
  subtitle?: string;
}
export default function LayoutRoot({ children, title, subtitle }: LayoutRootProps) {
  return (
    <div className="grid grid-cols-[256px_1fr] grid-rows-[64px_1fr] min-h-screen">
      <Layout.SideBar />

      <Header title={title} subtitle={subtitle} />

      <main>{children}</main>
    </div>
  );
}
