import { database } from "@/db/database";
import { ItemCard } from "./item-card";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item: any) => (
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    </main>
  );
}
