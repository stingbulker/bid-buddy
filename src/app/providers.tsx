"use client";

import { env } from "@/env";
import {
  KnockFeedProvider,
  KnockProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import{useSession} from "next-auth/react"
import { ReactNode, useRef, useState } from "react";

export function Providers({children}: {children: ReactNode}){
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  if(!session?.data?.user?.id){
    return <div>{children}</div>
  }

  return (
    <KnockProvider apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} userId={session.data.user.id}>
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        <div>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
          {children}
        </div>
      </KnockFeedProvider>
    </KnockProvider>
  );
};