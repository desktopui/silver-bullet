import { WebClient } from "@slack/client";
import { useAsyncEffect } from "use-async-effect";
import { useState } from "react";

export interface SlackConversation {
  name: string;
  id: string;
  topic: {
    value: string;
  };
}

export interface SlackMessage {
  subtype: string;
  text: string;
  ts: string;
  type: string;
  user: string;
}

export function getAllChannels(web: WebClient): Promise<SlackConversation[]> {
  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: "public_channel",
    limit: 20
  };

  return web.conversations.list(param).then(results => {
    return (results as any).channels as Array<SlackConversation>;
  });
}

export function fetchMessages(
  token: string,
  activeChannel: SlackConversation
): Promise<Array<SlackMessage>> {
  const web = new WebClient(token);
  const param = {
    channel: activeChannel.id
  };
  return web.conversations.history(param).then(results => {
    return (results as any).messages as Array<SlackMessage>;
  });
}

export interface SlackUser {
  id: string;
  deleted: boolean;
  is_admin: boolean;
  name: string;
  profile: {
    title: string;
    real_name: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
    image_original: string;
  };
  real_name: string;
}

export function fetchUsers(token: string): Promise<Array<SlackUser>> {
  const web = new WebClient(token);
  const param = {};
  return web.users.list(param).then(results => {
    return (results as any).members as Array<SlackUser>;
  });
}

export function useSlackApi<T>(
  prop: any,
  call: () => Promise<T[]>
): [Array<T>, boolean] {
  const [data, setData] = useState([] as Array<T>);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(
    async () => {
      try {
        const response = await call();
        setData(response);
      } catch (e) {
        setData(e);
      }
      setLoading(false);
    },
    () => {},
    [prop]
  );
  return [data, loading];
}
