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

export interface SlackAttachment {
  id: string;
  created: string;
  timestamp: string;
  name: string;
  title: string;
  mimetype: string;
  filetype: string;
  // pretty_type, user, editable, size, mode, is_external, external_type, is_public, public_url_shared, display_as_bot, username, url_private, url_private_download,
  thumb_64: string;
  thumb_80: string;
  thumb_360: string;
  thumb_720: string;
  thumb_1024: string;
  // thumb_360_w, thumb_360_h, thumb_480, thumb_480_w, thumb_480_h, thumb_160, thumb_720, thumb_720_w, thumb_720_h, thumb_800, thumb_800_w, thumb_800_h, thumb_960, thumb_960_w, thumb_960_h, thumb_1024, thumb_1024_w, thumb_1024_h, image_exif_rotation, original_w, original_h, permalink, permalink_public}
  permalink: string;
  url_private: string;
  permalink_public: string;
  original_w: number;
  original_h: number;
}

export interface SlackMessage {
  subtype: string;
  text: string;
  ts: string;
  type: string;
  user: string;
  files?: SlackAttachment[];
}

export async function getAllChannels(
  token: string
): Promise<SlackConversation[]> {
  const web = new WebClient(token);

  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: "public_channel",
    limit: 20
  };

  return web.conversations.list(param).then(results => {
    if (results.ok) {
      return (results as any).channels as Array<SlackConversation>;
    } else {
      throw new Error(results.error);
    }
  });
}

export async function fetchMessages(
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

// TODO: rewrite with Suspense
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
        alert(e.message);
        setData([]);
      }
      setLoading(false);
    },
    () => {},
    [prop]
  );
  return [data, loading];
}
