import type { Link, Node } from "../store.ts";

type Props = {
  nodes: Node[];
  links: Link[];
};

const NodesMap = ({ nodes, links }: Props) => {
  return <div>Map</div>;
};

export default NodesMap;
