import { database } from "@/db/database";
import { ItemCard } from "./item-card";
import { pageTitleStyles } from "@/style";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="pace-y-8">
      <h1 className={pageTitleStyles}>Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item: any) => (
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    </main>
  );
}
