/**
 * Sessions keep an IPv6 address as the network it belongs to, written out in
 * full: "2a02:8109:9d40:1f00:0000:0000:0000:0000". This brings it back to the
 * usual short notation, "2a02:8109:9d40:1f00::". IPv4 addresses pass through.
 *
 * Returns null for the all-zero address, which stands for "not known".
 */
export function formatIpAddress(address: string | null) {
  if (!address) return null;
  if (!address.includes(":")) return address;

  const groups = address.split(":").map((group) => group.replace(/^0+(?=.)/, ""));
  const significant = groups.findLastIndex((group) => group !== "0") + 1;

  if (significant === 0) return null;
  if (significant === groups.length) return groups.join(":");

  return `${groups.slice(0, significant).join(":")}::`;
}
