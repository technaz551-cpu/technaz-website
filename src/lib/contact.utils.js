/** Resolve which office drives the main contact map embed. Client-safe. */
export function getPrimaryMapOffice(content) {
  const offices = content?.offices || [];
  return (
    offices.find((o) => o.isPrimaryMap && o.mapEmbedUrl) ||
    offices.find((o) => o.mapEmbedUrl) ||
    offices[0] ||
    null
  );
}
