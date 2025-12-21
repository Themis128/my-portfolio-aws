type SnapshotHtmlFrameProps = {
  title: string;
  route: string;
};

function isValidRouteSegment(route: string): boolean {
  return /^[a-z0-9-]+$/i.test(route);
}

export function SnapshotHtmlFrame({ title, route }: SnapshotHtmlFrameProps) {
  if (!isValidRouteSegment(route)) {
    throw new Error("Invalid snapshot route segment");
  }

  return (
    <iframe
      className="min-h-[75svh] w-full rounded-lg border"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts"
      src={`/_snapshot/${route}`}
      title={title}
    />
  );
}
