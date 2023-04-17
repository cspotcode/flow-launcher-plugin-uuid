import { Flow } from "./lib/flow.js";
import { z } from "zod";
import { randomUUID } from "crypto";
import clipboardy from "clipboardy";

// The events are the custom events that you define in the flow.on() method.
const events = ["copy"] as const;
type Events = (typeof events)[number];

const flow = new Flow<Events>("assets/icon.png");

flow.on("query", (params) => {
	const [...inputs] = z.array(z.string()).parse(params);

	const uuid = randomUUID();
	const uuidWithoutHyphens = uuid.replace(/-/g, '');

	flow.showResult({
		title: `Copy: ${uuid}`,
		subtitle: '',
		method: "copy",
		parameters: [uuid],
	}, {
		title: `Copy: ${uuidWithoutHyphens}`,
		subtitle: 'w/out hyphens',
		method: "copy",
		parameters: [uuidWithoutHyphens],
	});
});

flow.on("copy", (params) => {
	const [uuid] = z.array(z.string()).parse(params);

	clipboardy.writeSync(uuid);
});

flow.run();
