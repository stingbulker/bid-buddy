import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item: any) => (
          <div key={item.id} className="border p-8 rounded-xl">
            {item.name}<br></br>
            starting price: ${item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}
