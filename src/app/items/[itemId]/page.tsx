import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { pageTitleStyles } from "@/style";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/util/files";
import { formatDistance } from "date-fns";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <Image src="/package.svg" width="200" height="200" alt="Package" />
        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className="text-center">
          The Item you&apos;re trying to view is invalid.
          <br />
          Please go back and search for a different auction item.
        </p>
        <Button asChild>
          <Link href={`/auctions`}>View Auctions</Link>
        </Button>
      </div>
    );
  }

  const bids = [
    {
      id: 1,
      amount: 100000000,
      userName: "Yuvraj",
      timestamp: new Date(),
    },
    {
      id: 2,
      amount: 50000000,
      userName: "Varun",
      timestamp: new Date(),
    },
    {
      id: 3,
      amount: 75000000,
      userName: "Sumit",
      timestamp: new Date(),
    },
  ];

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div>
          <h1 className={pageTitleStyles}>
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            className="rounded-xl"
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
          />
          <div className="text-xl">
            Starting Price of{" "}
            <span className="font-bold">${item.startingPrice}</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Current Bids</h2>
          <ul>
            {bids.map((bid) => (
              <li key={bid.id}>
                <div>
                  <span className="font-bold">${bid.amount}</span> by{" "}
                  <span className="font-bold">{bid.userName}</span>
                  <div className="">{formatTimestamp(bid.timestamp)}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
