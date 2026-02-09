import FloatingButton from "@/components/cardapio/floating-button";

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingButton />
    </>
  );
}
