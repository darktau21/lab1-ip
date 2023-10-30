import { Link, Model, Route, Node } from "../store";

export class CalcModel {
  // private readonly model: Model;
  private readonly avgMsgLength: number;
  private readonly msgIntensity: number;
  // private readonly minTime: number;
  private readonly nodes: Node[];
  private readonly links: Link[];
  private readonly routes: Route[];
  public avgTransTimeTable: {
    route: number;
    channels: { linkId: string; avgTransTime: number; formula: string }[];
  }[] = []; // Таблица 4
  public nodeMsgAvgCountTable: {
    route: number;
    nodes: { nodeId: string; avgCount: number; formula: string }[];
  }[] = []; // Таблица 5
  public nodeIntensityTable: {
    route: number;
    nodes: { nodeId: string; intensity: number; formula: string }[];
  }[] = []; // Таблица 6
  public nodeAvgTimeTable: {
    route: number;
    nodes: { nodeId: string; avgTime: number; formula: string }[];
  }[] = []; // Таблица 7
  public routeTimeTable: { route: number; time: number; formula: string }[];
  public routeMsgDeliveryTimeTable: {
    route: number;
    time: number;
    formula: string;
  }[] = [];

  constructor(model: Model) {
    // this.model = model;

    this.avgMsgLength = model.avgMsgLength;
    this.msgIntensity = model.msgIntensity;
    // this.minTime = model.minTime;
    this.nodes = model.nodes ?? [];
    this.links = model.links ?? [];
    this.routes = model.routes ?? [];

    // this.calcAvgTransferTime();
    // this.calcAll();
    // console.log(this.calcRouteTime());
  }

  public calcRouteMsgDeliveryTime() {
    return this.avgTransTimeTable.map((route) => {
      return {
        route: route.route,
        time:
          route.channels.reduce((acc, cur) => acc + cur.avgTransTime, 0) +
          this.routeTimeTable[route.route].time,
        formula:
          route.channels
            .reduce((acc, cur) => `${acc} + ${cur.avgTransTime.toFixed(3)}`, "")
            .slice(3) +
          ` + ${this.routeTimeTable[route.route].time.toFixed(3)}`,
      };
    });
  }

  public calcRouteTime() {
    this.routeTimeTable = this.nodeAvgTimeTable.map((route) => {
      return {
        route: route.route,
        time: route.nodes.reduce((acc, cur) => acc + cur.avgTime, 0),
        formula: route.nodes
          .reduce((acc, cur) => `${acc} + ${cur.avgTime.toFixed(3)}`, "")
          .slice(3),
      };
    });

    return this.routeTimeTable;
  }

  private getLinkByNodes(node1: Node, node2: Node) {
    return this.links.find(
      (l) =>
        (l.source === node1.id && l.target === node2.id) ||
        (l.source === node2.id && l.target === node1.id)
    );
  }

  private calculateRouteFailure(route: Route) {
    let prob = 1;
    const fLinks = [];
    let formula = "1 - ";
    for (let i = 0; i < route.nodes.length - 1; i += 1) {
      const node = this.nodes[+route.nodes[i] - 1];
      const nextNode = this.nodes[+route.nodes[i + 1] - 1];
      const link = this.getLinkByNodes(node, nextNode);
      if (link) {
        fLinks.push(link);
      }
    }

    const usedNodes = new Set<string>();
    for (const link of fLinks) {
      prob *= 1 - (link?.failureRate ?? 0);
      const prevNode = this.nodes[+link.source - 1];
      const nextNode = this.nodes[+link.target - 1];
      const prevProb = 1 - (prevNode?.failureRate ?? 0);
      const nextProb = 1 - (nextNode?.failureRate ?? 0);

      if (!usedNodes.has(prevNode.id)) {
        usedNodes.add(prevNode.id);
        prob *= prevProb;
        formula += `(1 - ${prevNode?.failureRate ?? 0})`;
      }
      formula += `(1 - ${link?.failureRate ?? 0})`;
      if (!usedNodes.has(nextNode.id)) {
        usedNodes.add(nextNode.id);
        prob *= nextProb;
        formula += `(1 - ${nextNode?.failureRate ?? 0})`;
      }
    }

    return { prob: 1 - prob, formula };
  }

  calcRouteFailures() {
    return this.routes.map((route) => this.calculateRouteFailure(route));
  }

  calcAvgLinkTransferTime() {
    return this.links.map((link) => ({
      linkId: link.id,
      time: link.avgMsgSize / (link.speed * link.channelsCount),
      formula: `${link.avgMsgSize} / (${link.speed} * ${link.channelsCount})`,
    }));
  }

  calcNormRoutesFailures(routeFailures: { prob: number }[]) {
    const res = [];
    const sum = routeFailures.reduce((acc, cur) => acc + cur.prob, 0);

    for (const failure of routeFailures) {
      res.push({
        prob: failure.prob / sum,
        formula: `${failure.prob.toFixed(3)} / ${sum.toFixed(3)}`,
      });
    }

    return res;
  }

  public calcAvgTransferTime() {
    this.routes.forEach((route, j) => {
      this.avgTransTimeTable.push({ route: j, channels: [] });
      for (let i = 0; i < route.nodes.length - 1; i += 1) {
        const node = this.nodes[+route.nodes[i] - 1];
        const nextNode = this.nodes[+route.nodes[i + 1] - 1];
        const link = this.getLinkByNodes(node, nextNode);
        if (link) {
          this.avgTransTimeTable[j].channels.push({
            linkId: link.id,
            // avgTransTime:
            //   this.avgMsgLength / (link.speed * link.channelsCount) +
            //   link.failureRate * link.recoveryTime +
            //   nextNode.failureRate * nextNode.recoveryTime,
            avgTransTime: this.avgMsgLength / (link.speed * link.channelsCount),
            formula: `${this.avgMsgLength} / (${link.speed} * ${link.channelsCount})`,
          });
        }
      }
    });

    return this.avgTransTimeTable;
  }

  public calcAll() {
    const routeFailures = this.routes.map((route) =>
      this.calculateRouteFailure(route)
    );
    const normRouteFailures = this.calcNormRoutesFailures(routeFailures);

    const routeIntensities = this.routes.map((_, i) => ({
      route: i,
      intensity: normRouteFailures[i].prob * this.msgIntensity,
      formula: `${normRouteFailures[i].prob.toFixed(3)} * ${
        this.msgIntensity
      } =  ${(normRouteFailures[i].prob * this.msgIntensity).toFixed(3)}`,
    }));

    routeIntensities.forEach((routeIntensity) => {
      this.nodeIntensityTable.push({
        route: routeIntensity.route,
        nodes: [
          {
            nodeId: this.routes[routeIntensity.route].nodes[0],
            intensity: routeIntensity.intensity,
            formula: `${normRouteFailures[routeIntensity.route].prob.toFixed(
              3
            )} * ${this.msgIntensity}`,
          },
        ],
      });
    });

    const avgTransTime = this.links.map(
      (link) => this.avgMsgLength / (link.speed * link.channelsCount)
    );

    for (let i = 0; i < this.routes.length; i += 1) {
      const p = this.nodeIntensityTable[i].nodes[0].intensity * 0;
      // const p = this.nodeIntensityTable[i].nodes[0].intensity * this.minTime;
      // const p = this.msgIntensity * avgTransTime[i];

      this.nodeAvgTimeTable.push({
        route: i,
        nodes: [
          {
            nodeId: this.routes[i].nodes[0],
            avgTime: (p * 0) / (1 - p),
            formula: `(${p.toFixed(3)} * ${(0).toFixed(3)}) / (1 - ${p.toFixed(
              3
            )}) = ${((p * 0) / (1 - p)).toFixed(
              3
            )}; p = ${this.nodeIntensityTable[i].nodes[0].intensity.toFixed(
              3
            )} * ${(0).toFixed(3)} = ${p.toFixed(3)}`,
          },
        ],
      });

      this.nodeMsgAvgCountTable.push({
        route: i,
        nodes: [
          {
            nodeId: this.routes[i].nodes[0],
            avgCount: p ** 2 / (1 - p),
            formula: `(${p.toFixed(3)} ^ 2) / (1 - ${p.toFixed(3)}) = ${(
              p ** 2 /
              (1 - p)
            ).toFixed(3)}; p = ${this.nodeIntensityTable[
              i
            ].nodes[0].intensity.toFixed(3)} * ${avgTransTime[i].toFixed(
              3
            )} = ${p.toFixed(3)}`,
          },
        ],
      });
    }

    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];
      for (let j = 1; j < route.nodes.length; j += 1) {
        this.nodeIntensityTable[i].nodes.push({
          nodeId: route.nodes[j],
          intensity:
            normRouteFailures[i].prob * this.msgIntensity -
            this.nodeMsgAvgCountTable[i].nodes[j - 1].avgCount,
          // formula: `${this.nodeIntensityTable[i].nodes[j - 1].intensity.toFixed(
          //   3
          // )} - ${this.nodeMsgAvgCountTable[i].nodes[j - 1].avgCount.toFixed(
          //   3
          // )}`,
          formula: `${normRouteFailures[i].prob.toFixed(3)} * ${
            this.msgIntensity
          } - ${this.nodeMsgAvgCountTable[i].nodes[j - 1].avgCount.toFixed(3)}`,
        });

        const prevNode = this.nodes[+route.nodes[j - 1] - 1];
        const nextNode = this.nodes[+route.nodes[j] - 1];
        const link = this.getLinkByNodes(prevNode, nextNode);
        const avgLinkTime =
          this.avgMsgLength / (link.speed * link.channelsCount);

        const p = this.nodeIntensityTable[i].nodes[j].intensity * avgLinkTime;

        this.nodeAvgTimeTable[i].nodes.push({
          nodeId: route.nodes[j],
          avgTime: (p * avgLinkTime) / (1 - p),
          formula: `(${p.toFixed(3)} * ${avgLinkTime.toFixed(
            3
          )}) / (1 - ${p.toFixed(3)}) = ${((p * avgLinkTime) / (1 - p)).toFixed(
            3
          )}; p = ${this.nodeIntensityTable[i].nodes[j].intensity.toFixed(
            3
          )} * ${avgLinkTime.toFixed(3)} = ${p.toFixed(3)}`,
        });

        this.nodeMsgAvgCountTable[i].nodes.push({
          nodeId: route.nodes[j],
          avgCount: p ** 2 / (1 - p),
          formula: `(${p.toFixed(3)} ^ 2) / (1 - ${p.toFixed(3)}) = ${(
            p ** 2 /
            (1 - p)
          ).toFixed(3)}; p = ${this.nodeIntensityTable[i].nodes[
            j
          ].intensity.toFixed(3)} * ${avgLinkTime.toFixed(3)} = ${p.toFixed(
            3
          )}`,
        });
      }
    }

    return {
      nodeMsgAvgCountTable: this.nodeMsgAvgCountTable,
      nodeAvgTimeTable: this.nodeAvgTimeTable,
      nodeIntensityTable: this.nodeIntensityTable,
      routeIntensities,
    };
  }
}
