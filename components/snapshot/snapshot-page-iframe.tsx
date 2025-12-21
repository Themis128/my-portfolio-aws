type SnapshotPageIframeProps = {
  title: string;
  route: string;
};

function normalizeRoute(route: string): string {
  return route.startsWith("/") ? route.slice(1) : route;
}

export function SnapshotPageIframe({ title, route }: SnapshotPageIframeProps) {
  const src = `/_snapshot/${normalizeRoute(route)}`;

  return (
    <iframe
      className="min-h-[75svh] w-full rounded-lg border"
      referrerPolicy="no-referrer"
      sandbox="allow-same-origin allow-scripts"
      src={src}
      title={title}
    />
  );
}
